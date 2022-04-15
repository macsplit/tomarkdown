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
        let item = context.inputItems[0] as! NSExtensionItem
        let message = item.userInfo?[SFExtensionMessageKey]
        os_log(.default, "Received message from browser.runtime.sendNativeMessage: %@", message as! CVarArg)

        let response = NSExtensionItem()
        response.userInfo = [ SFExtensionMessageKey: [ "SafariWebExtensionHandler Response to": message ] ]

        context.completeRequest(returningItems: [response], completionHandler: nil)
    }

}
