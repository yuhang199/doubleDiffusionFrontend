"use client";

/**
 * Click-to-play video window with a caption. Uses native controls and
 * preload="none" so nothing downloads until the visitor presses play.
 *
 * The download button, right-click menu, and picture-in-picture are turned
 * off to discourage casual saving. This is a deterrent only: anything a
 * browser can play can still be captured with dev tools or a screen recorder.
 */
export default function ReelPlayer({ reel, label = reel.title }) {
  return (
    <figure className="reel-player">
      {label && <figcaption className="reel-player-label">{label}</figcaption>}
      <div className="reel-player-frame">
        {reel.src ? (
          <video
            className="reel-player-video"
            src={reel.src}
            poster={reel.poster ?? undefined}
            controls
            controlsList="nodownload"
            disablePictureInPicture
            onContextMenu={(e) => e.preventDefault()}
            playsInline
            preload="none"
          />
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
