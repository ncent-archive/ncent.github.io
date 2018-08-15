
$(document).ready(function () {
    $('#preloader').fadeIn();
    $.ajax({
        url: 'https://cors-anywhere.herokuapp.com/https://api.rss2json.com/v1/api.json',
        type: 'GET',
        dataType: 'json',
        data:{
            rss_url: 'https://medium.com/feed/@kk_ncnt',
            api_key: 'mqa7ssz0pessoufddh6hy2uk1u98wyegtpmphtwi',
            count: 15
        },
        error: function(error) { callAjaxAgain();}
    }).done(function(rss) {
        let posts = rss.items;
        updateAllArticles(posts);
        // document.getElementById("#article1tile").addEventListener('click', function() {
        //     window.open(posts[1].link);
        //     return false;
        // });
    });
    
})

function callAjaxAgain(){
    $.ajax({
        url: 'https://cors-anywhere.herokuapp.com/https://api.rss2json.com/v1/api.json',
        type: 'GET',
        dataType: 'json',
        data:{
            rss_url: 'https://medium.com/feed/@kk_ncnt',
            api_key: 'mqa7ssz0pessoufddh6hy2uk1u98wyegtpmphtwi',
            count: 15
        },
        error: function(error) { callAjaxAgain();}
    }).done(function(rss) {
        let posts = rss.items;
        updateAllArticles(posts);
       // window.location.reload(true);
       
    });
}
function updateLatestArticle(posts){
    $( '#latestheader' ).text(posts[0].title);
    $( '#latestimage').attr('style', 'background-image:url('+posts[0].thumbnail + ');');
    $( '#latestheader' ).attr('href', posts[0].link);
    $( '#latestdate' ).text(getDateString(posts[0].pubDate.substring(0, 10)));
}
function updateAllArticles(posts){
    updateLatestArticle(posts);
    for(var i = 1; i < 10; i++){
        updateSingleArticle('#article'+i+'piclink','#article'+i+'link','#article'+i+'header', '#article'+i+'date', '#article'+i+'pic', '#article'+i+'tags','#article'+i+'cont', i, posts);
    }

}
function updateSingleArticle(piclink, link, header, date, pic, tags, content, num, posts){
        $( pic).attr('src', posts[num].thumbnail);
        $( getExcerpt(posts, num)).insertAfter(content);
        $( header).text(posts[num].title);
        $( makeTags(posts[num].categories) ).insertAfter(tags);
        $( date).text(getDateString(posts[num].pubDate.substring(0, 10)));
        $( header).attr('href', posts[num].link);
        $( link).attr('href', posts[num].link);
        $( link).attr('style', "color:#656565");
        $( date).attr('href', posts[num].link);
        $( pic).attr('href', posts[num].link);
        $( piclink).attr('href', posts[num].link);
        // $(document).getElementById(tile).setAttribute('onclick', 'location.href = \"'+posts[num].link+'\"');
        
}
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
function getDateString(pubDate){
    var year = pubDate.substring(0,4);
    var month = Number(pubDate.substring(5, 7));
    month = months[month-1];
    var day = pubDate.substring(8);
    return month + ' ' + day + ', ' + year;

}
function getExcerpt(posts, num){
    var fullContent = posts[num].content;
    var str;
    if(fullContent.indexOf('</figure>')== -1){
        str = fullContent;
    }
    else{
        str = fullContent.substring(fullContent.indexOf('</figure>')+9);
    } 
    var el = $('<div></div>');
    var excerpt = el.html(str);
    var plainText = '<p>'+ excerpt.text().substr(0, 300)+'</p>';
    return plainText;
}

function makeTags(tags){
    var tagArray = tags.toString().split(',');
    let htmlToInsert= '';
    for(var i =0; i < tagArray.length; i++){
        htmlToInsert+= '<a href=\"';
        htmlToInsert+= 'https://medium.com/tag/' + tagArray[i];
        htmlToInsert+='\">' + tagArray[i].charAt(0).toUpperCase() + tagArray[i].substring(1)+ '</a>'
    }
    return htmlToInsert;
}

