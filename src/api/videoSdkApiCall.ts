export const createStream = async (token: any) => {
    const res = await fetch('https://api.videosdk.live/v2/rooms', {
      method: 'POST',
      headers: {
        authorization: `${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({}),
    });
    console.log(res, '===@@@');
    
    //Destructuring the streamId from the response
    const {roomId: streamId} = await res.json();
    console.log(streamId, '===@@@');
    
    return streamId;
  };