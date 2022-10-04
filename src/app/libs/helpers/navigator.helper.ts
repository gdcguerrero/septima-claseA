export class navigatorHelper {

    static getLocation(): Promise<any> {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                post => {
                    //console.log('request > ',post);
                    resolve(post)
                },
                err => {
                    //console.log('err > ',err);
                    reject(err)
                }
            )
        }
        )
    }

    static getLocationC(success: (key: any) => void, error: (key: any) => void) {
        navigator.geolocation.getCurrentPosition(
            position => {
                success(position)
            },
            err => {
                error(err)
            }
        )
    }

    static startRecord(video: HTMLVideoElement, stop: HTMLButtonElement) {
        navigator.mediaDevices.getUserMedia(
            {
                video: {
                    width: 600,
                    height: 400,
                    deviceId: {
                        exact: 'a631a5f4b20721a45517d9593a5ac0bfd964d7d246260bbf16114f538affe388' // id de la camara que necesites capturar
                    }
                },
                audio: true  // obtener audio
            }
        ).then(media => {  // habilitas la camara e iniciar la grabacion
            //console.log(media);
            video.srcObject = media
            video.onloadedmetadata = resp => {
                video.play()
                let data: any[] = [];
                const record = new MediaRecorder(media, {
                    mimeType: 'video/webm'
                })
                record.ondataavailable = event => {
                    console.log('toDataAvailable');
                    data.push(event.data)
                }
                record.onstop = () => {
                    console.log('toOnStop');
                    const blob = new Blob(data, {
                        type: 'video/webm'
                    })
                    // const reader = new FileReader()   //pasa a base 64  - pero no es muy util
                    // reader.readAsDataURL(blob)
                    // reader.onloadend = () => {
                    //     console.log('>>>',reader.result);                        
                    // }
                    const url = URL.createObjectURL(blob)
                    const elA = document.createElement('a')
                    document.body.appendChild(elA)
                    elA.href = url
                    elA.download = 'video.webm'
                    elA.click()
                    console.log(URL.createObjectURL(blob));
                }

                setTimeout(() => {
                    console.log('toStart');
                    record.start()
                }, 10);
                stop.addEventListener('click', () => {
                    console.log('toStop');
                    record.stop()
                })
            }
        })
    }

    static getDevices() {
        navigator.mediaDevices.enumerateDevices().then(  // aqui ves el id de la camara
            (resp) => {
                resp.forEach(item => {
                    if (item.kind === 'videoinput') {
                        console.log(item);
                    }
                })
            }
        )
    }

    static getAudio(audio: HTMLAudioElement, stop: HTMLButtonElement) {
        navigator.mediaDevices.getUserMedia(
            {
                audio: true
            }
        ).then(
            media => {
                audio.srcObject = media
                audio.onloadedmetadata = () => {
                    audio.play()
                    let data: any[] = [];
                    const record = new MediaRecorder(media, {
                        mimeType: 'audio/webm'
                    })
                    record.ondataavailable = event => {
                        console.log('toDataAvailable');
                        data.push(event.data)
                    }
                    record.onstop = () => {
                        console.log('toOnStop');
                        const blob = new Blob(data, {
                            type: 'audio/webm'
                        })
                        const url = URL.createObjectURL(blob)
                        const elA = document.createElement('a')
                        document.body.appendChild(elA)
                        elA.href = url
                        elA.download = 'audio.webm'
                        elA.click()
                        console.log(URL.createObjectURL(blob));
                    }
                    setTimeout(() => {
                        console.log('toStartSS');
                        record.start()
                    }, 10);
                    stop.addEventListener('click', () => {
                        console.log('toStopST');
                        record.stop()
                    })
                }
            }
        )
    }
}