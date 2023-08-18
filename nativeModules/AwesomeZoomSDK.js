
import {NativeModules} from 'react-native';

const {AwesomeZoomSDK} = NativeModules;

//to see what is loaded
console.log(NativeModules);

async function initZoom(publicKey, privateKey, domain) {
  console.log('calling zoom', AwesomeZoomSDK);
  const response = await AwesomeZoomSDK.initZoom(publicKey, privateKey, domain);

  console.log('Response', response);
}

async function joinMeeting(displayName = "Stefan", meetingNo, password) {
    console.log('calling zoom - join meeting', displayName, meetingNo, password);
    const response = await AwesomeZoomSDK.joinMeeting(displayName, meetingNo, password);
  
    console.log('Response - Join Meeting', response);
  }


async function startMeeting(meetingNumber, username, userId, jwtAccessToken, jwtApiKey) {
    console.log('calling zoom', meetingNumber, username, userId, jwtAccessToken, jwtApiKey );
    const response = await AwesomeZoomSDK.startMeeting(meetingNumber, username, userId, jwtAccessToken, jwtApiKey);
  
    console.log('Response - Start Meeting', response);
}
  

export {initZoom, joinMeeting, startMeeting};
