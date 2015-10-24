# namecheap-checker

This is a simple domain name checker to check domain name availability through [Namecheap's API](https://www.namecheap.com/support/api/intro.aspx)

# Usage

```javascript
var Ns = require('namecheap-checker'),
    checker = new Ns(USER, KEY, IP);
    checker.checkDomains(["google.com", "google.org", "google.net"], function(err, result) {
        if (err) {
          throw err;
        }
        console.log(result);
	});
```
