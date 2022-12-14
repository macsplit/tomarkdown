//
//  ViewController.swift
//  ToMarkdown
//
//  Created by Lee Hanken on 15/04/2022.
//

import UIKit
import WebKit

class ViewController: UIViewController, WKNavigationDelegate, WKScriptMessageHandler {

    @IBOutlet var webView: WKWebView!

    override func viewDidLoad() {
        super.viewDidLoad()

        self.webView.navigationDelegate = self
        self.webView.scrollView.isScrollEnabled = false

        self.webView.configuration.userContentController.add(self, name: "controller")

        self.webView.loadFileURL(Bundle.main.url(forResource: "Main", withExtension: "html")!, allowingReadAccessTo: Bundle.main.resourceURL!)
    }

    func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
        
        var AppGroup: String {
            "group.uk.co.hanken.tomarkdown"
        }

        let defaults = UserDefaults(suiteName: AppGroup)!
        
        let version = defaults.value(forKey: "version_pref") as? String ?? "0"
        
        if (version == "0") {
            
            let version = Bundle.main.object(forInfoDictionaryKey: "CFBundleShortVersionString")
            defaults.setValue( version, forKey: "version_pref")
            
            Timer.scheduledTimer(withTimeInterval: 1.5, repeats: false) {_ in
                
                let alert = UIAlertController(title: "Opening Settings...", message: "Go to Safari > Extensions", preferredStyle: .alert)
                
                alert.addAction(UIAlertAction(title: "OK", style: UIAlertAction.Style.default, handler: {_ in
                    UIApplication.shared.open(URL.init(string: UIApplication.openSettingsURLString)!, options: [:], completionHandler: {_ in
                    })
                }))
                
                self.present(alert, animated: false, completion: {
                    
                })
            }
        }
    }

    func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
        // Override point for customization.
    }

}
