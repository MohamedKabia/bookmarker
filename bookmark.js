 document.getElementById('form').addEventListener('submit',addbookmark);

 function addbookmark(e){
	e.preventDefault();
	var siteName=document.getElementById('linkName').value;
	var siteAddress=document.getElementById('linkAddress').value;
	
	var expression = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;
	var regex =new RegExp(expression);
	if(!siteAddress.match(regex)){
		alert('please enter a valid url');
		return false;
	}
	
	var bookmark={
			name:siteName,
			url:siteAddress
	         }
	form.reset();
			 
	if (localStorage.getItem('bookmarks')===null){
		var bookmarks=[];
		bookmarks.push(bookmark);
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	}else{
		//get bookmark as json 
		var bookmarks=JSON.parse(localStorage.getItem('bookmarks'));
		bookmarks.push(bookmark);
		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	}
	getBookmark()
	
}

 function deleatBookmark(url){
	 var bookmarks=JSON.parse(localStorage.getItem('bookmarks'));
	 for(var i=0; i<bookmarks.length; i++){
		 if(bookmarks[i].url == url){
			 bookmarks.pop(i);
		 }
	 }
	 localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
	 getBookmark()
}

 function getBookmark(){
	var bookmarks=JSON.parse(localStorage.getItem('bookmarks'));
	
	var bookmarkResult=document.getElementById('row');
	bookmarkResult.innerHTML='';
	for(var i =0; i< bookmarks.length; i++){
		var name=bookmarks[i].name;
		var url=bookmarks[i].url;
		bookmarkResult.innerHTML += `<div class="col-md-2 col-xs-3"><div class="card shadow">
			<a title="visit site" class="btn btn-outline-info" href="${url}" target="_blank">${name}</a>
			<button title="delete" onclick="deleatBookmark('${url}')" class="btn btn-outline-danger"><i class="fas fa-trash-alt"></i></button>
		
			`;
	}
}
getBookmark();
