import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Button,
  Text,
  Alert,
  NativeEventEmitter,
} from 'react-native';
import {NativeModules} from 'react-native';

const {AwesomeZoomSDK} = NativeModules;

const CustomViewer = ({ leaveMeeting }) => {
  const [showScreenShare, setShowScreenShare] = useState(false);

  const activeConfig = {
    kind: 'active',
    x: 0,
    y: 0,
    width: 1,
    height: 1,
  };

  const activeShareConfig = {
    kind: 'active-share',
    x: 0,
    y: 0,
    width: 1,
    height: 1,
  };

  return (
    <View style={StyleSheet.absoluteFillObject}>
      <Button onPress={leaveMeeting} title="Leave meeting" />
      <Button
        onPress={() => setShowScreenShare(!showScreenShare)}
        title={!showScreenShare ? 'Show screen' : 'Show video'}
      />
      <ZoomUsVideoView
        style={styles.customViewer}
        layout={[
          showScreenShare ? activeShareConfig : activeConfig,
          {
            kind: 'preview',
            x: 0.73,
            y: 0.73,
            width: 0.25,
            height: 0.2,
            border: true,
            showUsername: false,
            showAudioOff: true,
            background: '#ccc',
          },
        ]}
      />
    </View>
  );
};

const enableCustomizedMeetingUI = false;

const App = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isMeetingOngoing, setIsMeetingOngoing] = useState(false);


  useEffect(() => {
    (async () => {
      try {
        const initializeResult = await AwesomeZoomSDK.initZoom(
          
            publicKey= 'yT3iqClKSbq1mk95ZFI3Hw',
            privateKey= 'HdZhgOYqXbu8xAZ2j0oiLF7D144XJeJ4',
            domain= 'zoom.us'
          
        )

        console.log({ initializeResult });

        setIsInitialized(true);
      } catch (e) {
        Alert.alert('Error', 'Could not execute initialize');
        console.error('ERR', e);
      }
    })();
  }, []);

  useEffect(() => {
    if (!isInitialized) {
      return;
    }
  }, [isInitialized]);

  const startMeeting = async () => {
    try {
      const startMeetingResult = await AwesomeZoomSDK.startMeeting(
        username= 'Zelhus',
        meetingNumber= '93955536769',
        userId="54sC3aosQrqTM31Ez8SNUw",
        jwtAccessToken= "eyJzdiI6IjAwMDAwMSIsImFsZyI6IkhTNTEyIiwidiI6IjIuMCIsImtpZCI6IjU1MjBlZTkwLWY5YzgtNDM0Yi05NjdlLTJhNmRjNjgwODVkZiJ9.eyJhdWQiOiJodHRwczovL29hdXRoLnpvb20udXMiLCJ1aWQiOiI1NHNDM2Fvc1FycVRNMzFFejhTTlV3IiwidmVyIjo5LCJhdWlkIjoiZDgwMzg0MWNhZDgzMzMyMTcwNzE4MDIyY2VhNGE2ZDgiLCJuYmYiOjE2OTIyNzE1MjQsImNvZGUiOiJQWEtBT21VU1NpYUN6MmVCcENBdlNBQ3I0dVdrOHZkZXQiLCJpc3MiOiJ6bTpjaWQ6b0VobzJEMWNRR2ljbzlRbnBUUlVEZyIsImdubyI6MCwiZXhwIjoxNjkyMjc1MTI0LCJ0eXBlIjozLCJpYXQiOjE2OTIyNzE1MjQsImFpZCI6Ii1lc1FJbXV1U1BTRmpvbnREYk9PNlEifQ.IZ0mW-bWQ-qkqfbl-aLqiyX5UlOvrjAEnC6a0hMh_ssx1C1XaZebGDftzIN4ZtQwTkmi6ZzE0vh214HMiUt2ow",
        jwtApiKey= "oEho2D1cQGico9QnpTRUDg",
      );
 
      console.log({ startMeetingResult });
    } catch (e) {
      Alert.alert('Error', 'Could not execute startMeeting');
      console.error('ERR', e);
    }
  };

  const joinMeeting = async () => {
    try {
      const joinMeetingResult = await AwesomeZoomSDK.joinMeeting(
        displayName='Zelhus',
        meetingNumber= '98776736089',
        password= 'OTFmQ2YyZUp0dkNMR3BwYlF3RVYydz09',
      ).then((res)=> console.log(res))

      console.log({ joinMeetingResult });
    } catch (e) {
      Alert.alert('Error', 'Could not execute joinMeeting');
      console.error('ERR', e);
    }
  };

  const leaveMeeting = async () => {
    try {
      const leaveMeetingResult = await ZoomUs.leaveMeeting();

      console.log({ leaveMeetingResult });
    } catch (e) {
      Alert.alert('Error', 'Could not execute leaveMeeting');
      console.error('ERR', e);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Button
          onPress={() => startMeeting()}
          title="Start meeting"
          disabled={!isInitialized}
        />
        <Text>-------</Text>
        <Button
          onPress={() => joinMeeting()}
          title="Join meeting"
          disabled={!isInitialized}
        />
      </View>
      {enableCustomizedMeetingUI && isMeetingOngoing && (
        <CustomViewer leaveMeeting={leaveMeeting} />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  customViewer: {
    width: '100%',
    flex: 1,
  },
});

export default App;
