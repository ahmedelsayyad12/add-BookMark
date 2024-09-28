var siteNameInput = document.getElementById('siteName');
var siteUrlInput = document.getElementById('siteUrl');
var searchInput = document.getElementById('search');
var closeBtn= document.getElementById('closeBtn');
var visitBtn= document.getElementById('visitBtn');
var message = document.getElementById('massage-info')
var bookmarksConatiner =[];
if (localStorage.getItem('bookmarks')!==null){
    bookmarksConatiner = JSON.parse(localStorage.getItem('bookmarks'));
    display()
} 
function addBookmark(){
    if(validation(siteName)&&
        validation(siteUrl)){
    var bookmark={
        siteName:siteNameInput.value,    
        siteUrl:siteUrlInput.value,    
    };
    bookmarksConatiner.push(bookmark)
    localStorage.setItem('bookmarks',JSON.stringify(bookmarksConatiner));
    display();
    clearForm();
}else{
    message.classList.remove('d-none')
}
};

function clearForm() {
    siteNameInput.value=null;
    siteUrlInput.value=null;
    siteNameInput.classList.remove('is-valid')
    siteUrlInput.classList.remove('is-valid')
};
function display(){
    var conatiner=''
    for(i=0;i<bookmarksConatiner.length;i++){
        conatiner+=`<tr>
                            <td>${i+1}</td>
                            <td>${bookmarksConatiner[i].siteName}</td>
                            <td><button onclick="visitUrl(${i})" class="btn btn-success" id="visitBtn"><i class="fa-solid fa-eye me-1"></i>Visit</a></button></td>
                            <td><button onclick="deletebookmark(${i})" class="btn btn-danger"><i class="fa-solid fa-trash me-1"></i>Delete</button></td>
                        </tr>
        `
    };
    document.getElementById('tableContent').innerHTML=conatiner;
};
function visitUrl(index){
    var httpsRegex = /^https?:\/\//;
    if (httpsRegex.test(bookmarksConatiner[index].siteUrl)) {
      open(bookmarksConatiner[index].siteUrl);
    } else {
      open(`https://${bookmarksConatiner[index].siteUrl}`);
    }
}
function deletebookmark(index){
    bookmarksConatiner.splice(index,1);
    localStorage.setItem('bookmarks',JSON.stringify(bookmarksConatiner));
    display();

}
function searchBookmarks(term){
    var term = searchInput.value
    var conatiner='';
    for (let i = 0; i < bookmarksConatiner.length; i++) {
        if (bookmarksConatiner[i].siteName.toLowerCase().includes(term.toLowerCase())) {
            conatiner+=`<tr>
                            <td>${i+1}</td>
                            <td>${bookmarksConatiner[i].siteName}</td>
                            <td><button class="btn btn-success"><i class="fa-solid fa-eye me-1"></i><a href="${bookmarksConatiner[i].siteUrl}" class="text-decoration-none">Visit</a></button></td>
                            <td><button onclick="deletebookmark(${i})" class="btn btn-danger"><i class="fa-solid fa-trash me-1"></i>Delete</button></td>
                        </tr>
        `
        }
        
    }
    document.getElementById('tableContent').innerHTML=conatiner;
}
function validation(ele){
    var regex={
        siteName:/^[A-z][a-z]{3,9}$/,
        siteUrl:/(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?\/[a-zA-Z0-9]{2,}|((https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z]{2,}(\.[a-zA-Z]{2,})(\.[a-zA-Z]{2,})?)|(https:\/\/www\.|http:\/\/www\.|https:\/\/|http:\/\/)?[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}\.[a-zA-Z0-9]{2,}(\.[a-zA-Z0-9]{2,})?/,
    }
    if(regex[ele.id].test(ele.value)){
        ele.classList.remove('is-invalid')
        ele.classList.add('is-valid')
        return true
    }else{
        ele.classList.add('is-invalid')
        ele.classList.remove('is-valid')
        return false;
    }
}
function closeModal() {
    message.classList.add("d-none");
  }
  closeBtn.addEventListener("click", closeModal);

  document.addEventListener("keydown", function (e) {
    if (e.key == "Escape") {
      closeModal();
    }
  });
  document.addEventListener("keydown", function (e) {
    if (e.key == "Enter") {
      addBookmark();
    }
  });
  
  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("message-info")) {
      closeModal();
    }
  });
  