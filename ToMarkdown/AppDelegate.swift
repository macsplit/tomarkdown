//
//  AppDelegate.swift
//  ToMarkdown
//
//  Created by Lee Hanken on 15/04/2022.
//

import UIKit

@main
class AppDelegate: UIResponder, UIApplicationDelegate {

    var window: UIWindow?

    func setup() {
        let version = UserDefaults.standard.value(forKey: "version_pref") as? String ?? "0"
        
        if (version == "0") {
            
            let version = Bundle.main.object(forInfoDictionaryKey: "CFBundleShortVersionString")
            UserDefaults.standard.setValue( version, forKey: "version_pref")
            
            UIApplication.shared.open(URL.init(string: UIApplication.openSettingsURLString)!, options: [:], completionHandler: {_ in
            })
        }

    }
    
    func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
        // Override point for customization after application launch.
        
        setup()
        
        return true
    }

    func application(_ application: UIApplication, configurationForConnecting connectingSceneSession: UISceneSession, options: UIScene.ConnectionOptions) -> UISceneConfiguration {
        return UISceneConfiguration(name: "Default Configuration", sessionRole: connectingSceneSession.role)
    }

}
