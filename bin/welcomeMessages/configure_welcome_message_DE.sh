#!/bin/bash

curl -X POST -H "Content-Type: application/json" -d '{
  "setting_type":"call_to_actions",
  "thread_state":"new_thread",
  "call_to_actions":[
    {
      "message":{
        "attachment":{
          "type":"template",
          "payload":{
            "template_type":"generic",
            "elements":[
              {
                "title":"Willkommen bei Tablesurfer!",
                "item_url":"https://www.petersbowlerhats.com",
                "image_url":"https://www.petersbowlerhats.com/img/hat.jpeg",
                "subtitle":"An easy way to get to know each other besides university, clubs and bars.",
                "buttons":[
                  {
                    "type":"postback",
                    "title":"Anmelden",
                    "payload": "signup"
                  },
                  {
                    "type":"postback",
                    "title":"Sprache wählen",
                    "payload": "change_language"
                  }
                ]
              }
            ]
          }
        }
      }
    }
  ]
}' "https://graph.facebook.com/v2.6/424074667644759/thread_settings?access_token=CAAL42xBgvGgBABIQ1yZBUGFcmANQ8X0i46VprkK9NaR3hsP56B3vTSyGcIhOIhCZCqKb1e1aVMe4jIPG7EjZADiwRFJbn0BOOaw3x4cehbrK2wdinxdaEtcxLSoCZBT0MJZCwFlmQMiMdO1ZCHqNDXQVkhZC4SXHimfBT2fQJnNfGXfm2Nzt5SUDZAbxO2cK7H71kVKZCZC955cwZDZD"