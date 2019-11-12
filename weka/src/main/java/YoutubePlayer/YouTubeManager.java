package YoutubePlayer;

import com.google.gdata.client.youtube.YouTubeQuery;
import com.google.gdata.client.youtube.YouTubeService;
import com.google.gdata.data.media.mediarss.MediaThumbnail;
import com.google.gdata.data.youtube.VideoEntry;
import com.google.gdata.data.youtube.VideoFeed;
import com.google.gdata.data.youtube.YouTubeMediaContent;
import com.google.gdata.data.youtube.YouTubeMediaGroup;

import java.net.URL;
import java.util.LinkedList;
import java.util.List;

public class YouTubeManager {
    private static final String YOUTUBE_URL = " https://www.googleapis.com/youtube/v3/search?part=snippet&order=rating&type=video&key=AIzaSyBqWl5V6kbRC6ODBLBT6REuo__VkwBpLwU";
    private static final String YOUTUBE_EMBEDDED_URL = "http://www.youtube.com/v/";

    private String clientID;

    public  YouTubeManager(){

    }
    public YouTubeManager(String clientID) {
        this.clientID = clientID;
    }

    public void retrieveVideos(String textQuery, boolean filter) throws Exception {

        YouTubeService service = new YouTubeService("qjmZL1y-L3K4o4H2uAv35lYv");
        service.setConnectTimeout(1000); // millis
        YouTubeQuery query = new YouTubeQuery(new URL("https://www.googleapis.com/youtube/v3/videos?part=id%2Csnippet&id=5vY8EWokf40&key=AIzaSyAy6FOkLVHxRjL0JqHd-Q6mHx-22u5VC6I"));
       // System.out.println("query"+query);
        System.out.println(textQuery);
       // query.setOrderBy(YouTubeQuery.OrderBy.VIEW_COUNT);
        query.setFullTextQuery(textQuery);
        query.setSafeSearch(YouTubeQuery.SafeSearch.NONE);
        query.setMaxResults(10);
        System.out.println(query);

        VideoFeed videoFeed = service.getFeed(new URL("https://www.googleapis.com/youtube/v3/videos?part=id%2Csnippet&id=5vY8EWokf40&key=AIzaSyAy6FOkLVHxRjL0JqHd-Q6mHx-22u5VC6I"), VideoFeed.class);
        /*
        List<VideoEntry> videos = videoFeed.getEntries();
        System.out.println("videos:"+videos);

 */


    }

    private List<YouTubeVideo> convertVideos(List<VideoEntry> videos) {

        List<YouTubeVideo> youtubeVideosList = new LinkedList<YouTubeVideo>();

        for (VideoEntry videoEntry : videos) {

            YouTubeVideo ytv = new YouTubeVideo();

            YouTubeMediaGroup mediaGroup = videoEntry.getMediaGroup();
            String webPlayerUrl = mediaGroup.getPlayer().getUrl();
            ytv.setWebPlayerUrl(webPlayerUrl);

            String query = "?v=";
            int index = webPlayerUrl.indexOf(query);

            String embeddedWebPlayerUrl = webPlayerUrl.substring(index+query.length());
            embeddedWebPlayerUrl = YOUTUBE_EMBEDDED_URL + embeddedWebPlayerUrl;
            ytv.setEmbeddedWebPlayerUrl(embeddedWebPlayerUrl);

            List<String> thumbnails = new LinkedList<String>();
            for (MediaThumbnail mediaThumbnail : mediaGroup.getThumbnails()) {
                thumbnails.add(mediaThumbnail.getUrl());
            }
            ytv.setThumbnails(thumbnails);

            List<YouTubeMedia> medias = new LinkedList<YouTubeMedia>();
            for (YouTubeMediaContent mediaContent : mediaGroup.getYouTubeContents()) {
                medias.add(new YouTubeMedia(mediaContent.getUrl(), mediaContent.getType()));
            }
            ytv.setMedias(medias);

            youtubeVideosList.add(ytv);

        }

        return youtubeVideosList;

    }

}

