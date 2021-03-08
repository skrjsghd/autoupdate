import React, { useEffect, useState } from 'react'
import UpdateModal from './UpdateModal';
const { ipcRenderer } = window.require('electron');


function App() {
  const [version, setVersion] = useState();
  const [notification, setNotification] = useState();

  useEffect(() => {
    ipcRenderer.send('app_version');
    ipcRenderer.on('app_version', (event, arg) => {
      ipcRenderer.removeAllListeners('app_version');
      setVersion(arg.version);
    })
    ipcRenderer.on('update_available', () => {
      ipcRenderer.removeAllListeners('update_available');
      setNotification('download');
    })
    ipcRenderer.on('update_downloaded', () => {
      ipcRenderer.removeAllListeners('update_downloaded');
      setNotification('updated');
    })
  },[])

  const closeModal = () => {
    setNotification(null);
  }

  const restartApp = () => {
    ipcRenderer.send('restart_app');
  }

  const displayModal = () => {
    if(notification === 'download') {
      return (
        <UpdateModal body='업데이트 파일을 다운로드 중입니다...' />
      )
    }
    else if(notification === 'updated') {
      return (
        <UpdateModal 
          body='업데이트 파일 다운로드가 완료되었습니다. 재시작하세요' 
          restart={restartApp} 
          close={closeModal}
        />
      )
    }
    else {
      return null
    }
  }
  
  return (
    <div>
      <h1>hello?</h1>
      {displayModal()}
      {version}
    </div>
  )
}

export default App
