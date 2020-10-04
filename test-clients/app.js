const socket = io('ws://localhost:3000');

$(document).ready(function () {
  $('#start').click((event) => {
    socket.emit('start stream', 'Imagine this is a stream of bytes');
    socket.send('Hello !');
  });

  $('#stop').click((event) => {
    socket.emit('stop stream', 'imma stop streaming now');
  });

  $('#host').click((event) => {
    socket.emit('host', '');
  });

  $('#join').click((event) => {
    var id = $('#hostidip').val();
    if (id === '') {
      console.log('cannot be empty');
    } else if (id === socket.id) {
      alert('You cannot join your own room!');
    }

    socket.emit('join', id);
  });

  $('#start').click((event) => {
    //Check for webcam permissions.
    if (navigator.mediaDevices.getUserMedia) {
      // Start the stream locally
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          console.log(stream);
          document.getElementById('vidstream').srcObject = stream;
        })
        .catch((err) => {
          console.log(err);
        });

      //Send the frames to the server.
      setInterval(() => {
        socket.emit('videoframe', getFrame());
      }, 10);
    }
  });

  //Captures a frame and encodes it in base64 format.
  const getFrame = () => {
    const video = document.getElementById('vidstream');
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);
    const data = canvas.toDataURL('image/png');
    return data;
  };

  $('#stop').click((event) => {
    const stream = document.getElementById('vidstream').srcObject;
    const tracks = stream.getTracks();

    tracks.forEach((track) => {
      track.stop();
    });

    document.getElementById('vidstream').srcObject = null;
  });

  $('form').submit((event) => {
    var msg = $('#sendmessage').val();
    socket.emit('text_msg', msg);
    $('#chatbox').append(msg + '\n');
    event.preventDefault();
  });

  socket.on('hostid', (data) => {
    $('#hostid').text(data);
  });

  socket.on('err', (data) => {
    alert(data);
  });

  //On revieving a video frame
  socket.on('broadcast_vid_frame', (data) => {
    console.log('recieving frame... ' + data.toString().length);
  });

  //On recieving a text message.
  socket.on('broadcast_msg', (data) => {
    $('#chatbox').append(data + '\n');
  });
});
