"use client";

import { useRef, useCallback } from "react";
import { ReactSkinview3d } from "react-skinview3d";
import type { SkinViewer } from "skinview3d";
import { WalkingAnimation } from "skinview3d";
import { springTransition } from "../constants";
interface AvatarViewerProps {
  skinUrl: string;
  width: number;
  height: number;
  onReady?: (viewer: SkinViewer) => void;
}

export default function AvatarViewer({
  skinUrl,
  width,
  height,
  onReady,
}: AvatarViewerProps) {
  const viewerRef = useRef<SkinViewer | null>(null);

  const handleReady = useCallback(
    ({ viewer }: { viewer: SkinViewer }) => {
      viewerRef.current = viewer;
      viewer.autoRotate = true;
      viewer.autoRotateSpeed = 0.8;
      viewer.animation = new WalkingAnimation();
      onReady?.(viewer);
    },
    [onReady]
  );

  return (
    <div className="w-full h-full flex items-center justify-center">
      <ReactSkinview3d
        skinUrl={skinUrl}
        width={width}
        height={height}
        onReady={handleReady}
        options={{
          background: "#1a2f1a",
          zoom: 0.9,
        }}
      />
    </div>
  );
}
