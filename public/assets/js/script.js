const socket = io('https://activeknocker.codonnier.tech:3030')
console.log(socket);

const ROOM_ID = "TEST"
const NAME = Name;


const main_video = document.getElementById('my_video')
const second_video = document.getElementById('second_video')
const third_video = document.getElementById('third_video')
const muteaudio = document.getElementById('muteaudio')
const mutevideo = document.getElementById('mutevideo')
const btnmsg = document.getElementById('btnmsg')
const sharescreen = document.getElementById('sharescreen')
const invitebtn = document.getElementById('invite_btn')

var screen = '';

var screenStream = null

const pc = [];

const AllPeers = new Map();
const AllPeersNames = new Map();
let myVideoStream;

const myPeer = new Peer(undefined, {
    // host: '/',
    // port: '9000'

    host: 'dry-fjord-14156.herokuapp.com',
})



myPeer.on('open', id => {
    console.log("--------------------------------------");
    console.log("MY PEER ID LOG");
    console.log("MY PEER ID", id);
    setTimeout(() => {
        socket.emit('join-room', ROOM_ID, id, NAME)
    }, 1500);
})

if (navigator.mediaDevices === undefined) {
    navigator.mediaDevices = {};
}
if (navigator.mediaDevices.getUserMedia === undefined) {
    navigator.mediaDevices.getUserMedia = function(constraints) {
        var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        if (!getUserMedia) {
            return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
        }
        return new Promise(function(resolve, reject) {
            getUserMedia.call(navigator, constraints, resolve, reject);
        });
    }
}

navigator.mediaDevices.getUserMedia({
        audio: {
            echoCancellation: true,
            noiseSuppression: true,
            sampleRate: 44100
        },
        video: true
    })
    .then(function(stream) {

        // navigator.mediaDevices.getDisplayMedia({
        //         video: {
        //             cursor: "always"
        //         },
        //         audio: {
        //             echoCancellation: true,
        //             noiseSuppression: true,
        //             sampleRate: 44100
        //         }
        //     }).then((stream) => {
        console.log("--------------------------------------");
        console.log(stream);
        setTimeout(() => {
            addVideoStream(myPeer.id, stream, "My Stream", NAME)
        }, 1500);

        myVideoStream = stream;
        myPeer.on('call', call => {
            call.answer(stream)
            call.on('stream', userVideoStream => {
                if (AllPeers.has(call.peer)) {
                    return;
                }
                pc.push(call);
                AllPeers.set(call.peer, { call });
                divcount = document.querySelectorAll('#second_video .participants-video-container').length;
                if (divcount >= 3) {
                    gride_type = "Other"
                } else {
                    gride_type = "Connect"
                }
                addVideoStream(call.peer, userVideoStream, gride_type, call.metadata)
            })
        })

        socket.on('user-connected', (userId, name) => {
            console.log("--------------------------------------");
            console.log("NEW USER CONNECTED LOG");
            console.log("USER ID", userId);
            console.log("USER NAME", name);
            AllPeersNames.set(userId, name);
            setTimeout(() => {
                connectToNewUser(userId, stream, name)
            }, 1500);

        })
    })
    .catch(function(err) {
        console.log(err.name + ": " + err.message);
    });


socket.on('user-disconnected', userId => {
    console.log("--------------------------------------");
    console.log("NEW USER DISCONNECTED LOG");
    console.log("USER ID", userId);

    if (AllPeers.has(userId)) {
        AllPeers.delete(userId);
        AllPeersNames.delete(userId);
    }
    const boxes = Array.from(document.getElementsByClassName(`${userId}share`));
    if (boxes.length != 0) {
        boxes.forEach(box => {
            box.remove();
        });
        var videoshare = document.getElementById(`${myPeer.id}User`);
        const my_video = document.createElement('div')
        my_video.id = myPeer.id
        my_video.classList.add('video-container', `${myPeer.id}`)
        my_video.append(videoshare)
        main_video.append(my_video)
        const div2 = document.createElement('div')
        div2.classList.add('participants-name', 'author-symbol', `${myPeer.id}`)
        const span = document.createElement('span')
        span.classList.add('symbol')
        div2.append(span)
        const img = document.createElement('img')
        img.src = base_url + "/assets/media/participants-author-name-sign.png"
        span.append(img)
        const span2 = document.createElement('span')
        span2.classList.add('symbol')
        span2.innerText = NAME
        div2.append(span2)
        main_video.append(div2)
        const elem = document.getElementById(`${myPeer.id}main`);
        elem.remove();
    }
    const element = document.getElementById(userId)
    if (element != null) {
        if (element.classList.contains('second_video')) {
            const otherIds = document.querySelector('.third_video');
            if (otherIds != null) {
                const otherId = document.querySelector('.third_video').id
                console.log(otherId);
                if (otherId != null) {
                    const video = document.getElementById(`${otherId}User`);
                    const remove = document.getElementById(`${otherId}`);
                    this.appendToHTMLTree(otherId, video, '', 'Connect', AllPeersNames.get(otherId));
                    remove.remove();
                }
            }
        }
        element.remove()
    }

})

function connectToNewUser(peerId, stream = null, name) {
    const call = myPeer.call(peerId, stream)
    call.metadata = NAME
    call.on('stream', uservideostream => {
        if (AllPeers.has(call.peer)) {
            return;
        }
        pc.push(call);
        AllPeers.set(call.peer, { call });
        divcount = document.querySelectorAll('#second_video .participants-video-container').length;
        if (divcount >= 3) {
            gride_type = "Other"
        } else {
            gride_type = "Connect"
        }
        addVideoStream(peerId, uservideostream, gride_type, name);
        handleShareScreen(screenStream)
    })
}

function addVideoStream(peerId, stream = null, type = null, name = null, url = null, isCurrentId = false) {
    if (peerId == myPeer.id) isCurrentId = true
    const video = this.createVideoElement({
        muted: isCurrentId,
        src: url,
        srcObject: stream,
        peerId: peerId
    })
    this.appendToHTMLTree(peerId, video, isCurrentId, type, name)
}

function createVideoElement({ peerId, muted = true, src, srcObject }) {
    const video = document.createElement('video')
    video.setAttribute("id", `${peerId}User`);
    video.muted = muted
    video.src = src
    video.srcObject = srcObject
    if (src) {
        video.controls = true
        video.loop = true
        Util.sleep(200).then(_ => video.play())
    }
    if (srcObject) {
        video.addEventListener("loadedmetadata", () => video.play())
    }
    return video
}

function appendToHTMLTree(userId, video, isCurrentId, type, name) {
    if (type == "My Stream") {
        const my_video = document.createElement('div')
        my_video.id = userId
        my_video.classList.add('video-container', `${userId}`)
        my_video.append(video)
        main_video.append(my_video)
        const div2 = document.createElement('div')
        div2.classList.add('participants-name', 'author-symbol', `${userId}`)
        const span = document.createElement('span')
        span.classList.add('symbol')
        div2.append(span)
        const img = document.createElement('img')
        img.src = base_url + "/assets/media/participants-author-name-sign.png"
        span.append(img)
        const span2 = document.createElement('span')
        span2.classList.add('symbol')
        span2.innerText = name
        div2.append(span2)
        main_video.append(div2)
    } else if (type == "Connect") {
        const my_video = document.createElement('div')
        my_video.id = userId
        my_video.classList.add('participants-video-container', 'small', 'second_video')
        my_video.append(video)
        second_video.append(my_video)
        const div2 = document.createElement('div')
        div2.classList.add('video-container')
        div2.append(video)
        my_video.append(div2)
        const div3 = document.createElement('div')
        div3.classList.add('participants-name')
        div3.innerText = name
        my_video.append(div3)
        const div4 = document.createElement('div')
        div4.classList.add('participants-audio-symbol')
        const img = document.createElement('img')
        img.src = base_url + "/assets/media/muted-white.png"
        div4.append(img)
        my_video.append(div4)
    } else {
        const maindiv = document.createElement('div')
        maindiv.classList.add('col-md-3', 'third_video')
        maindiv.id = userId
        maindiv.append(video)
        const my_video = document.createElement('div')
        my_video.classList.add('participants-video-container', 'small')
        my_video.append(video)
        maindiv.append(my_video)
        const div2 = document.createElement('div')
        div2.classList.add('video-container')
        div2.append(video)
        my_video.append(div2)
        const div3 = document.createElement('div')
        div3.classList.add('participants-name')
        div3.innerText = name
        my_video.append(div3)
        const div4 = document.createElement('div')
        div4.classList.add('participants-audio-symbol')
        const img = document.createElement('img')
        img.src = base_url + "/assets/media/muted-white.png"
        div4.append(img)
        my_video.append(div4)
        third_video.append(maindiv)
    }

}



muteaudio.addEventListener('click', () => {
    let enabled = myVideoStream.getAudioTracks()[0].enabled;
    const muteicon = document.getElementById('muteicon')
    if (enabled) {
        myVideoStream.getAudioTracks()[0].enabled = false;
        muteicon.innerHTML = (`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-mic-mute-fill" viewBox="0 0 16 16">
        <path d="M13 8c0 .564-.094 1.107-.266 1.613l-.814-.814A4.02 4.02 0 0 0 12 8V7a.5.5 0 0 1 1 0v1zm-5 4c.818 0 1.578-.245 2.212-.667l.718.719a4.973 4.973 0 0 1-2.43.923V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 1 0v1a4 4 0 0 0 4 4zm3-9v4.879L5.158 2.037A3.001 3.001 0 0 1 11 3z"/>
        <path d="M9.486 10.607 5 6.12V8a3 3 0 0 0 4.486 2.607zm-7.84-9.253 12 12 .708-.708-12-12-.708.708z"/>
      </svg>`)
        muteicon.style.color = "red";
        muteaudio.innerHTML = (`Unmute Audio`)
    } else {
        myVideoStream.getAudioTracks()[0].enabled = true;
        muteicon.innerHTML = (`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-mic-fill" viewBox="0 0 16 16">
        <path d="M5 3a3 3 0 0 1 6 0v5a3 3 0 0 1-6 0V3z"/>
        <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z"/>
      </svg>`)
        muteicon.style.color = "#fff";
        muteaudio.innerHTML = (`Mute Audio`)
    }
})

mutevideo.addEventListener('click', () => {
    let enabled = myVideoStream.getVideoTracks()[0].enabled;
    const muteicon = document.getElementById('videoicon')
    if (enabled) {
        myVideoStream.getVideoTracks()[0].enabled = false;
        muteicon.innerHTML = (`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-camera-video-off-fill" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M10.961 12.365a1.99 1.99 0 0 0 .522-1.103l3.11 1.382A1 1 0 0 0 16 11.731V4.269a1 1 0 0 0-1.406-.913l-3.111 1.382A2 2 0 0 0 9.5 3H4.272l6.69 9.365zm-10.114-9A2.001 2.001 0 0 0 0 5v6a2 2 0 0 0 2 2h5.728L.847 3.366zm9.746 11.925-10-14 .814-.58 10 14-.814.58z"/>
      </svg>`)
        muteicon.style.color = "red";

        mutevideo.innerHTML = (`Enable Video`)
    } else {
        myVideoStream.getVideoTracks()[0].enabled = true;
        muteicon.innerHTML = (`<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-camera-video-fill" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2V5z"/>
      </svg>`)
        muteicon.style.color = "#fff";
        mutevideo.innerHTML = (`Disable Video`)
    }
})


btnmsg.addEventListener('click', event => {
    var message = msg_area.value
    if (message != "") {
        appendMessage(`${message}`, "My")
        socket.emit('send-chat-message', ROOM_ID, message, NAME)
        msg_area.value = ''
    }
})

socket.on('chat-message', data => {
    appendMessage(`${data.message}`, "Other", `${data.name}:`)
})

socket.on('stopScreen', data => {
    var elem = document.getElementById(`${myPeer.id}main`);
    if (elem.classList.contains('second_video')) {
        const video = document.getElementById(`${data}User`);
        const my_video = document.createElement('div')
        my_video.id = data
        my_video.classList.add('participants-video-container', 'small', 'second_video')
        const div2 = document.createElement('div')
        div2.classList.add('video-container')
        div2.append(video)
        my_video.append(div2)
        const div3 = document.createElement('div')
        div3.classList.add('participants-name')
        div3.innerText = AllPeersNames.get(data)
        my_video.append(div3)
        const div4 = document.createElement('div')
        div4.classList.add('participants-audio-symbol')
        const img = document.createElement('img')
        img.src = base_url + "/assets/media/muted-white.png"
        div4.append(img)
        my_video.append(div4)
        const temp = document.createElement('div')
        temp.id = data + "temp"
        elem.before(temp)
        const newapend = document.getElementById(`${data}temp`);
        newapend.after(my_video)
        newapend.remove();
    } else if (elem.classList.contains('third_video')) {
        const video = document.getElementById(`${data}User`);
        const maindiv = document.createElement('div')
        maindiv.classList.add('col-md-3', 'third_video')
        maindiv.id = data
        maindiv.append(video)
        const my_video = document.createElement('div')
        my_video.classList.add('participants-video-container', 'small')
        my_video.append(video)
        maindiv.append(my_video)
        const div2 = document.createElement('div')
        div2.classList.add('video-container')
        div2.append(video)
        my_video.append(div2)
        const div3 = document.createElement('div')
        div3.classList.add('participants-name')
        div3.innerText = AllPeersNames.get(data)
        my_video.append(div3)
        const div4 = document.createElement('div')
        div4.classList.add('participants-audio-symbol')
        const img = document.createElement('img')
        img.src = base_url + "/assets/media/muted-white.png"
        div4.append(img)
        my_video.append(div4)
        const temp = document.createElement('div')
        temp.id = data + "temp"
        elem.before(temp)
        const newapend = document.getElementById(`${data}temp`);
        newapend.after(maindiv)
        newapend.remove();
    }

    const boxes = Array.from(document.getElementsByClassName(`${data}share`));
    boxes.forEach(box => {
        box.remove();
    });
    var videoshare = document.getElementById(`${myPeer.id}User`);
    const my_video = document.createElement('div')
    my_video.id = myPeer.id
    my_video.classList.add('video-container', `${myPeer.id}`)
    my_video.append(videoshare)
    main_video.append(my_video)
    const div2 = document.createElement('div')
    div2.classList.add('participants-name', 'author-symbol', `${myPeer.id}`)
    const span = document.createElement('span')
    span.classList.add('symbol')
    div2.append(span)
    const img = document.createElement('img')
    img.src = base_url + "/assets/media/participants-author-name-sign.png"
    span.append(img)
    const span2 = document.createElement('span')
    span2.classList.add('symbol')
    span2.innerText = NAME
    div2.append(span2)
    main_video.append(div2)
    elem.remove();
})


socket.on('startScreen', data => {

    if (screenStream != null) {
        screenStream.getVideoTracks()[0].stop();
        stopSharingScreen()
    }
    var elem = document.getElementById(`${data}`);
    if (elem.classList.contains('second_video')) {
        const video = document.getElementById(`${myPeer.id}User`);
        const my_video = document.createElement('div')
        my_video.id = myPeer.id + "main"
        my_video.classList.add('participants-video-container', 'small', 'second_video')
        const div2 = document.createElement('div')
        div2.classList.add('video-container')
        div2.append(video)
        my_video.append(div2)
        const div3 = document.createElement('div')
        div3.classList.add('participants-name')
        div3.innerText = NAME
        my_video.append(div3)
        const div4 = document.createElement('div')
        div4.classList.add('participants-audio-symbol')
        const img = document.createElement('img')
        img.src = base_url + "/assets/media/muted-white.png"
        div4.append(img)
        my_video.append(div4)
        const temp = document.createElement('div')
        temp.id = myPeer.id + "temp"
        elem.before(temp)
        const newapend = document.getElementById(`${myPeer.id}temp`);
        newapend.after(my_video)
        newapend.remove();
    } else if (elem.classList.contains('third_video')) {
        const video = document.getElementById(`${myPeer.id}User`);
        const maindiv = document.createElement('div')
        maindiv.classList.add('col-md-3', 'third_video')
        maindiv.id = myPeer.id + "main"
        maindiv.append(video)
        const my_video = document.createElement('div')
        my_video.classList.add('participants-video-container', 'small')
        my_video.append(video)
        maindiv.append(my_video)
        const div2 = document.createElement('div')
        div2.classList.add('video-container')
        div2.append(video)
        my_video.append(div2)
        const div3 = document.createElement('div')
        div3.classList.add('participants-name')
        div3.innerText = NAME
        my_video.append(div3)
        const div4 = document.createElement('div')
        div4.classList.add('participants-audio-symbol')
        const img = document.createElement('img')
        img.src = base_url + "/assets/media/muted-white.png"
        div4.append(img)
        my_video.append(div4)
        const temp = document.createElement('div')
        temp.id = myPeer.id + "temp"
        elem.before(temp)
        const newapend = document.getElementById(`${myPeer.id}temp`);
        newapend.after(maindiv)
        newapend.remove();
        // third_video.append(maindiv)
    }

    const boxes = Array.from(document.getElementsByClassName(`${myPeer.id}`));
    boxes.forEach(box => {
        box.remove();
    });

    var videoshare = document.getElementById(`${data}User`);
    const my_video = document.createElement('div')
    my_video.id = data
    my_video.classList.add('video-container', `${data}share`)
    my_video.append(videoshare)
    main_video.append(my_video)
    const div2 = document.createElement('div')
    div2.classList.add('participants-name', 'author-symbol', `${data}share`)
    const span = document.createElement('span')
    span.classList.add('symbol')
    div2.append(span)
    const img = document.createElement('img')
    img.src = base_url + "/assets/media/participants-author-name-sign.png"
    span.append(img)
    const span2 = document.createElement('span')
    span2.classList.add('symbol')
    span2.innerText = AllPeersNames.get(data)
    div2.append(span2)
    main_video.append(div2)
    elem.remove();
})


function appendMessage(message, flag, name) {
    var current = new Date();
    var time = current.toLocaleString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    })
    console.log(current.getHours());
    console.log(current.getMinutes())

    const msg_chat_area = document.getElementById('msg_chat_area')
    if (flag == "My") {
        // const messageElement = document.createElement('div')
        // messageElement.classList.add('kt-chat__message')
        // const div2 = document.createElement('div')
        // div2.classList.add('kt-chat__user')
        // const div3 = document.createElement('div')
        // div3.classList.add('kt-chat__text', 'kt-bg-light-brand')
        // div3.innerText = message
        // messageElement.append(div2)
        // messageElement.append(div3)
        // msg_chat_area.append(messageElement)
        // msg_chat_area.scroll({ top: msg_chat_area.scrollHeight, behavior: "smooth" });

        const messageElement = document.createElement('div')
        messageElement.classList.add('kt-chat__message', 'kt-chat__message--right')

        const div2 = document.createElement('div')
        div2.classList.add('kt-chat__user')

        const div3 = document.createElement('div')
        div3.classList.add('kt-chat__text', 'kt-bg-light-brand')
        div3.innerText = message

        const span = document.createElement('span')
        span.classList.add('kt-media', 'kt-media--circle', 'kt-media--sm')

        const img = document.createElement('img')
        img.src = base_url + '/assets/media/participants1.jpg'

        const span1 = document.createElement('span')
        span1.innerText = 'From'

        const anchor = document.createElement('a')
        anchor.innerText = 'You'
        anchor.href = '#'

        const span2 = document.createElement('span')
        span2.innerText = 'to'

        const anchor1 = document.createElement('a')
        anchor1.innerText = 'Everyone'
        anchor1.href = '#'

        const span3 = document.createElement('span')
        span3.classList.add('kt-chat__datetime')
        span3.innerText = `${time}`

        span.append(img)
        div2.append(span3)
        div2.append(span1)
        div2.append(anchor)
        div2.append(span2)
        div2.append(anchor1)
        div2.append(span)
        messageElement.append(div2)
        messageElement.append(div3)
        msg_chat_area.append(messageElement)
        msg_chat_area.scroll({ top: msg_chat_area.scrollHeight, behavior: "smooth" });

    } else if (flag == "Other") {
        // const messageElement = document.createElement('div')
        // messageElement.classList.add('kt-chat__message', 'kt-chat__message--right')
        // const div2 = document.createElement('div')
        // div2.classList.add('kt-chat__user')
        // const div3 = document.createElement('div')
        // div3.classList.add('kt-chat__text', 'kt-bg-light-success')
        // div3.innerText = message
        // messageElement.append(div2)
        // messageElement.append(div3)
        // msg_chat_area.append(messageElement)
        // msg_chat_area.scroll({ top: msg_chat_area.scrollHeight });

        const messageElement = document.createElement('div')
        messageElement.classList.add('kt-chat__message')

        const div2 = document.createElement('div')
        div2.classList.add('kt-chat__user')

        const div3 = document.createElement('div')
        div3.classList.add('kt-chat__text', 'kt-bg-light-success')
        div3.innerText = message

        const span = document.createElement('span')
        span.classList.add('kt-media', 'kt-media--circle', 'kt-media--sm')

        const img = document.createElement('img')
        img.src = base_url + '/assets/media/participants1.jpg'

        const span1 = document.createElement('span')
        span1.innerText = 'From'

        const anchor = document.createElement('a')
        anchor.innerText = name
        anchor.href = '#'

        const span2 = document.createElement('span')
        span2.innerText = 'to'

        const anchor1 = document.createElement('a')
        anchor1.innerText = 'Everyone'
        anchor1.href = '#'

        const span3 = document.createElement('span')
        span3.classList.add('kt-chat__datetime')
        span3.innerText = `${time}`

        span.append(img)
        div2.append(span)
        div2.append(span1)
        div2.append(anchor)
        div2.append(span2)
        div2.append(anchor1)
        div2.append(span3)
        messageElement.append(div2)
        messageElement.append(div3)
        msg_chat_area.append(messageElement)
        msg_chat_area.scroll({ top: msg_chat_area.scrollHeight, behavior: "smooth" });
    }
}


sharescreen.addEventListener('click', () => {
    if (screenStream != null) {
        alert("You Screen Share alredy running.")
        return
    }
    navigator.mediaDevices.getDisplayMedia({
        video: {
            cursor: "always",

        },
        audio: {
            echoCancellation: true,
            noiseSuppression: true
        }
    }).then((stream) => {
        screenStream = stream;
        socket.emit('share', myPeer.id, ROOM_ID)

        let videoTrack = screenStream.getVideoTracks()[0];
        let audiotrack = screenStream.getAudioTracks()[0];
        let micaudiotrack = myVideoStream.getAudioTracks()[0];

        videoTrack.onended = () => {
            stopSharingScreen(videoTrack)

        }


        console.log("stream here", videoTrack);
        pc.forEach(element => {
            console.log(element.peerConnection.getSenders());
            // let sender = element.peerConnection.getSenders().find(function(s) {
            //     return s.track.kind == videoTrack.kind;
            // })
            // sender.replaceTrack(videoTrack);

            let sender = element.peerConnection.getSenders().find(s => s.track && s.track.kind === videoTrack.kind);
            sender.replaceTrack(videoTrack);

            // let micaudiosender = element.peerConnection.getSenders().find(s => s.track && s.track.kind === micaudiotrack.kind);
            // element.peerConnection.addTrack(micaudiotrack);

            // let audiosender = element.peerConnection.getSenders().find(s => s.track && s.track.kind === audiotrack.kind);
            // audiosender.replaceTrack(audiotrack);

        });
        screenStream.getVideoTracks()[0].addEventListener('ended', () => {
            stopSharingScreen(videoTrack);
        });
        broadcastNewTracks(stream, 'video', false);
    }).catch(function(err) {
        console.log(err.name + ": " + err.message);
    });
})

function handleShareScreen(videoTrack) {
    if (screenStream == null) {
        return
    }
    let videoTracks = videoTrack.getVideoTracks()[0];
    let test = videoTrack.getAudioTracks()[0];
    console.log("audio ", test);
    pc.forEach(element => {
        // let sender = element.peerConnection.getSenders().find(function(s) {
        //     return s.track.kind == videoTracks.kind;
        // })
        // sender.replaceTrack(videoTracks)
        console.log(element.peerConnection.getSenders());
        let sender = element.peerConnection.getSenders().find(s => s.track && s.track.kind === videoTracks.kind);
        sender.replaceTrack(videoTracks);
    });
}

function stopSharingScreen(videoTrack) {
    let myVideoStreams = myVideoStream.getVideoTracks()[0];
    screenStream = null;
    socket.emit('stopscreenshare', myPeer.id, ROOM_ID)
    pc.forEach(element => {
        // let sender = element.peerConnection.getSenders().find(function(s) {
        //     return s.track.kind == videoTrack.kind;
        // })
        // sender.replaceTrack(myVideoStreams)
        let sender = element.peerConnection.getSenders().find(s => s.track && s.track.kind === myVideoStreams.kind);
        sender.replaceTrack(myVideoStreams);
    });
    broadcastNewTracks(myVideoStream, 'video', false);
}

function broadcastNewTracks(stream, type, mirrorMode = true) {
    setLocalStream(stream, mirrorMode);
}

function setLocalStream(stream, mirrorMode = true) {
    const localVidElem = document.getElementById(`${myPeer.id}User`);
    localVidElem.srcObject = stream;
}


invitebtn.addEventListener('click', () => {

    var copyText = document.getElementById("invite_link");
    console.log(copyText);
    navigator.clipboard.writeText(copyText.value);
    alert("Successfully Copy Public URL")
})