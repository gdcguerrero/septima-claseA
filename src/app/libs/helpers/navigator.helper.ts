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

    static getLocationC(success:(key : any)=>void, error:(key : any)=>void){
        navigator.geolocation.getCurrentPosition(
            position => {
                success(position)
            },
            err => {
                error(err)
            }
        )
    }

    static startRecord(video: HTMLVideoElement, stop: HTMLButtonElement){
        navigator.mediaDevices.getUserMedia(
            {
            video: {
                width: 600,
                height: 400
            },
            //audio: true
        }
        ).then(media => {
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
                    // const reader = new FileReader()
                    // reader.readAsDataURL(blob)
                    // reader.onloadend = () => {
                    //     console.log('>>><>>>',reader.result);                        
                    // }
                    const url = URL.createObjectURL(blob)
                    const elA = document.createElement('a')
                    document.body.appendChild(elA)
                    elA.href = url
                    elA.download = 'video/webm'
                    elA.click()
                    console.log(URL.createObjectURL(blob));
                }
                
                setTimeout(() => {
                    console.log('toStart');
                    record.start()
                }, 10);
                stop.addEventListener('click',()=>{
                    console.log('toStop');
                    record.stop()
                })
            }
        })
    }
}