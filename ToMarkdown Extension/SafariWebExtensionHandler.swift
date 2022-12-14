//
//  SafariWebExtensionHandler.swift
//  ToMarkdown Extension
//
//  Created by Lee Hanken on 15/04/2022.
//

import SafariServices
import os.log

class SafariWebExtensionHandler: NSObject, NSExtensionRequestHandling {

    func beginRequest(with context: NSExtensionContext) {
        
        var AppGroup: String {
            "group.uk.co.hanken.tomarkdown"
        }
        
        let defaultUrl = "https://urltomarkdown.herokuapp.com/"
                
        let item = context.inputItems[0] as! NSExtensionItem
        let message = item.userInfo?[SFExtensionMessageKey]
        
        os_log(.default, "Received message from browser.runtime.sendNativeMessage: %@", message as! CVarArg)
        
        let defaults = UserDefaults(suiteName: AppGroup)!
        
        var url:String! = UserDefaults(suiteName: AppGroup)!.value(forKey: "server_url") as? String ?? defaultUrl
        
        let custom:Bool! = UserDefaults(suiteName: AppGroup)!.value(forKey: "custom_server") as? Bool ?? false
        
        if (custom == false) {
            url = defaultUrl
        }
        
        let response = NSExtensionItem()
        response.userInfo = [ SFExtensionMessageKey: [ "url": url ] ]

        context.completeRequest(returningItems: [response], completionHandler: nil)
        
    }

}
