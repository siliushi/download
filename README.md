# download
you can use download.js to download the link file, such as html, paf, doc, img etc;
it doesn't rely on any third party libraries. 

# support
|               | copy   |  cut    |  paste   |
| :-----------: |:------:| :------:| :------: |   
| chrome        | √      | √       | √        |
| Firefox       | √      | √       | √        |
| IE7+          | √      | √       | √        |

# use

```
<a id="a" href="test.html">html</a>
<script src="download.min.js"></script>
<script>
	document.getElementById('a').onclick = function(event) {
		event.preventDefault();
		download(this.href);
	};
</script>
```
