'use client';
import { useRef } from 'react';

export const Video = ({ video }: { video: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <section className="max-w-[920px] w-full mx-auto -translate-y-28 p-4" id="video">
      <div className="w-full h-fit">
        <iframe
          src={video}
          className="border-none w-full relative z-0 shadow-[0px_4px_35px_rgba(0,0,0,0.6)] aspect-video"
          allow="vr; camera; microphone; fullscreen"
          allowFullScreen
        />
      </div>
    </section>
  );
};
