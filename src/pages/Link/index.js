import React, { useEffect, useState } from 'react';

import history from '../../services/history';
import { api } from '../../services/api';

import { Container, BelvoWidget, CheckLive, AskLive } from './styles';

function Link() {
  const [live, setLive] = useState(false);

  const belvoScript = () => {
    const script = document.createElement('script');
    script.src = 'https://cdn.belvo.io/belvo-widget-1-stable.js';
    script.async = true;
    document.body.appendChild(script);

    return script;
  };

  const handleEnvironment = () => {
    setLive(!live);
  }

  useEffect(() => {
    const script = belvoScript();

    script.addEventListener('load', () => {
      const widgetBelvo = async () => {
        const response = await api.get('/auth', {
            headers: {
              "mode": !live ? "sandbox" : "live",
            }
          });

          //belvo lib
          function onEventCallbackFunction(data) {
            // Do something with the event data
          }

          function onExitCallbackFunction(data) {
            console.log(data.last_encountered_error);
            console.log(data.meta_data);
          }

          function successCallbackFunction(link_id, institution) {
                console.log({
                    link_id,
                    institution
                });
                
                history.push({ pathname: '/dashboard', state: link_id })
            }
          function openBelvoWidget() {
            // call the server to generate an access token to start the widget
            // you will need the "access" token (not the "refresh" token). 
            // For example: 
            // var token = getAccessTokenFromServer();
            // var access_token = token.access; 
            let access_token = response.data.access;

            window.belvoSDK.createWidget(access_token, {

                // Add your startup configuration here
                // Add your custom branding here

                callback: (link, institution) => successCallbackFunction(link, institution),
                onExit: (data) => onExitCallbackFunction(data),
                onEvent: (data) => onEventCallbackFunction(data)
            }).build();
        }

          document.getElementById("link-button").onclick = openBelvoWidget;
      } 
      widgetBelvo();     
    });
  }, [live]);

  return (
      <Container>
          <BelvoWidget>
            <div id="belvo"></div>
            <strong>Let's link an Account!</strong>
            <button id="link-button" type="button"><span id="title">Link Account</span></button>
            <CheckLive> 
                <AskLive><span>Want to test live? </span></AskLive>
                <label className="switch">
                  <input type="checkbox" onClick={() => handleEnvironment()}/>
                  <span className="slider round"></span>
                </label>
            </CheckLive>
          </BelvoWidget>
      </Container>
  );
}

export default Link;