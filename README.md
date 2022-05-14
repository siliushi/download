# download
you can use download.js to download the link file, such as html, paf, doc, img etc;
it doesn't rely on any third party libraries.    

# Support
ajax response   
```
download.fetch(ajax.response, filename)
```
# use

single file
```
<a id="a" href="test.html">html</a>
<script src="download.min.js"></script>
<script>
	document.getElementById('a').onclick = function(event) {
		event.preventDefault();
		download.init(this.href);
	};
</script>
```

multiply files
```
<script src="download.min.js"></script>
<script>
	document.getElementById('a').onclick = function(event) {
		event.preventDefault();
		download.init(['a.html', 'b.html']);
	};
</script>
```
