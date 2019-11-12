import sys
sys.path.append('/home/zakaria/youtube_tutorial/')
from Youtube.youtube_videos import youtube_search
from Youtube.youtube_videos import geo_query

import pandas as pd
import json
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/youtube', methods=['POST', 'GET'])
def youtube():


    """test1 = youtube_search(request.form["st"], token=None)"""
    stat=geo_query('0T0z8d0_aY4')
    print("les stats",stat)
    """ return jsonify(test1)"""

    def grab_videos(keyword, token=None):
        video_dict = {'youID':[], 'title':[], 'pub_date':[],'views':[]}
        res = youtube_search(keyword, token=token)
        token = res[0]
        videos = res[1]
        for vid in videos:
            video_dict['youID'].append(vid['id']['videoId'])
            video_dict['title'].append(vid['snippet']['title'])
            video_dict['pub_date'].append(vid['snippet']['publishedAt'])
            video_dict['views'].append(vid['statistics']['viewCount'])
        print ("added " + str(len(videos)) + " videos to a total of " + str(len(video_dict['youID'])))
        print(video_dict)
        return token





    token = grab_videos("spinners")
    while token != "last_page":
        token = grab_videos("spinners", token=token)


if __name__ == '__main__':
    app.run(debug=True)
