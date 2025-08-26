import { getLocalMedia } from '@/lib/local-media';
import { MediaGallery } from '@/components/ui/media-gallery';

export default function MediaPage() {
  const mediaManifest = getLocalMedia('/media');

  return (
    <div className="min-h-screen bg-bg-primary">
      <div className="container-padding section-padding">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
            Local Media Gallery
          </h1>
          <p className="text-lg text-text-primary/70 max-w-2xl mx-auto">
            All images and videos from our local media collection
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mt-6 text-sm text-text-primary/60">
            <span>📸 {mediaManifest.images.length} Images</span>
            <span>🎥 {mediaManifest.videos.length} Videos</span>
            <span>📁 Total: {mediaManifest.images.length + mediaManifest.videos.length} Files</span>
          </div>
        </div>

        <MediaGallery
          images={mediaManifest.images}
          videos={mediaManifest.videos}
          showVideos={true}
          gridCols={4}
          className="max-w-7xl mx-auto"
        />
      </div>
    </div>
  );
}
