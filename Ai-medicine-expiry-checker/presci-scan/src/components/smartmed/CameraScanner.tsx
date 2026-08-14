import { useCallback, useEffect, useRef, useState } from "react";
import { Camera, CameraOff, ScanBarcode } from "lucide-react";

import { Button } from "@/components/ui/button";

interface DetectedBarcode {
  rawValue: string;
}
interface BarcodeDetectorLike {
  detect: (source: CanvasImageSource) => Promise<DetectedBarcode[]>;
}

/**
 * WebRTC viewfinder with an explicit "Capture & Scan" trigger.
 * Decoding uses the platform BarcodeDetector when available.
 */
export function CameraScanner({
  onDecode,
  label = "Capture & Scan",
}: {
  onDecode: (value: string | null) => void;
  label?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [active, setActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const stop = useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    setActive(false);
  }, []);

  useEffect(() => () => stop(), [stop]);

  const start = async () => {
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setActive(true);
    } catch {
      setError("Camera unavailable or permission denied. Use the manual fallback below.");
    }
  };

  const capture = async () => {
    const video = videoRef.current;
    if (!video) return;
    setBusy(true);
    try {
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;
      canvas.getContext("2d")?.drawImage(video, 0, 0, canvas.width, canvas.height);
      const Ctor = (
        window as unknown as {
          BarcodeDetector?: new (opts?: { formats?: string[] }) => BarcodeDetectorLike;
        }
      ).BarcodeDetector;
      if (Ctor) {
        const detector = new Ctor();
        const codes = await detector.detect(canvas);
        onDecode(codes[0]?.rawValue ?? null);
      } else {
        onDecode(null);
      }
    } catch {
      onDecode(null);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="space-y-3">
      <div className="relative aspect-video overflow-hidden rounded-xl border border-border bg-black/60">
        <video ref={videoRef} muted playsInline className="h-full w-full object-cover" />
        {!active && (
          <div className="absolute inset-0 grid place-items-center text-center">
            <div>
              <ScanBarcode className="text-accent mx-auto size-8" />
              <p className="text-muted-foreground mt-2 text-xs">Camera off — start the viewfinder</p>
            </div>
          </div>
        )}
        <div className="pointer-events-none absolute inset-x-[12%] inset-y-[28%] rounded-lg border-2 border-accent/80" />
      </div>

      <div className="flex flex-wrap gap-2">
        {active ? (
          <>
            <Button onClick={() => void capture()} disabled={busy}>
              <ScanBarcode className="size-4" /> {busy ? "Scanning…" : label}
            </Button>
            <Button variant="outline" onClick={stop}>
              <CameraOff className="size-4" /> Stop camera
            </Button>
          </>
        ) : (
          <Button onClick={() => void start()}>
            <Camera className="size-4" /> Start camera
          </Button>
        )}
      </div>
      {error && <p className="text-destructive text-xs">{error}</p>}
    </div>
  );
}