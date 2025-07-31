import React from 'react';
import { useEventStore } from '../../store/eventStore';
import { Image as ImageIcon, Video, Music } from 'lucide-react';

const AssetView: React.FC = () => {
  const { events } = useEventStore();
  // Deduplicate events by id
  const uniqueEvents = Array.from(new Map(events.map(e => [e.id, e])).values());

  return (
    <div className="p-6 space-y-8">
      {/* Removed the Event Assets heading */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {uniqueEvents.map((event) => {
          const images = event.assets.filter((a: any) => a.type === 'image');
          const videos = event.assets.filter((a: any) => a.type === 'video');
          const music = event.assets.filter((a: any) => a.type === 'music');
          return (
            <div key={event.id} className="bg-white rounded-lg shadow p-4 flex flex-col gap-4 border">
              <h3 className="text-xl font-semibold mb-2 text-blue-700">{event.title}</h3>
              {/* Images */}
              <div>
                <h4 className="text-lg font-semibold mb-2 flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-blue-500" /> Images
                </h4>
                {images.length > 0 ? (
                  <div className="grid grid-cols-2 gap-2">
                    {images.map((img: any) => (
                      <img key={img.id} src={img.url} alt={img.name} className="rounded shadow border" />
                    ))}
                  </div>
                ) : (
                  <div className="text-gray-500 italic">No images available.</div>
                )}
              </div>
              {/* Videos */}
              <div>
                <h4 className="text-lg font-semibold mb-2 flex items-center gap-2">
                  <Video className="w-5 h-5 text-purple-500" /> Videos
                </h4>
                {videos.length > 0 ? (
                  <div className="space-y-2">
                    {videos.map((vid: any) => (
                      <video key={vid.id} controls className="w-full rounded shadow border">
                        <source src={vid.url} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    ))}
                  </div>
                ) : (
                  <div className="text-gray-500 italic">No videos available.</div>
                )}
              </div>
              {/* Music */}
              <div>
                <h4 className="text-lg font-semibold mb-2 flex items-center gap-2">
                  <Music className="w-5 h-5 text-green-500" /> Music Playlist
                </h4>
                {music.length > 0 ? (
                  <div className="space-y-2">
                    {music.map((track: any) => (
                      <audio key={track.id} controls className="w-full">
                        <source src={track.url} type="audio/mpeg" />
                        Your browser does not support the audio element.
                      </audio>
                    ))}
                  </div>
                ) : (
                  <div className="text-gray-500 italic">No music available.</div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AssetView;
