"use client";
import { useRef, useState } from "react";

/**
 * Click-to-play video window with a caption. Until the visitor presses the
 * centered play button there are no native controls (so no progress bar);
 * preload="none" means nothing downloads before then either.
 *
 * The download button, right-click menu, and picture-in-picture are turned
 * off to discourage casual saving. This is a deterrent only: anything a
 * browser can play can still be captured with dev tools or a screen recorder.
 */
export default function ReelPlayer({ reel, label = reel.title }) {
  const videoRef = useRef(null);
  const [started, setStarted] = useState(false);

  const start = () => {
    setStarted(true);
    videoRef.current?.play();
  };

  return (
    <figure className="reel-player">
      {label && <figcaption className="reel-player-label">{label}</figcaption>}
      <div className="reel-player-frame">
        {reel.src ? (
          <>
            <video
              ref={videoRef}
              className="reel-player-video"
              src={reel.src}
              poster={reel.poster ?? undefined}
              controls={started}
              controlsList="nodownload"
              disablePictureInPicture
              onContextMenu={(e) => e.preventDefault()}
              playsInline
              preload="none"
            />
            {!started && (
              <button
                type="button"
                className="reel-player-play"
                aria-label={`Play ${reel.title}`}
                onClick={start}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M8 5.5v13l11-6.5z" />
                </svg>
              </button>
            )}
          </>
        ) : (
          <div
            className="reel-player-placeholder"
            style={reel.poster ? { backgroundImage: `url(${reel.poster})` } : undefined}
          >
            <span>Reel coming soon</span>
          </div>
        )}
      </div>
    </figure>
  );
}
