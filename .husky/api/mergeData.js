const deleteTripStops = (tripFirebaseKey) => new Promise((resolve, reject) => {
  getVideoComments(videoFirebaseKey).then((commentsArray) => {
    console.warn(commentsArray);
    const deleteCommentPromises = commentsArray.map((comment) => deleteComment(comment.commentFirebaseKey));

    Promise.all(deleteCommentPromises).then(() => {
      deleteSingleVideo(videoFirebaseKey).then(resolve);
    });
  }).catch((error) => reject(error));
});
