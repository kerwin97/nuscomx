var selected = '';
function hideCaptchas() {
    var elements = document.getElementsByTagName("iframe");
    for (var i = 0; i < elements.length; i++) {
        elements[i].parentElement.parentElement.remove();
    }
}
function verifyCaptcha(response) {
    console.log(response);
    alert('1');
    var xhttp = new XMLHttpRequest();
    alert('2');
    xhttp.onreadystatechange = function() {
    	alert('A');
        if (this.readyState == 4 && this.status == 200) {
    		alert('B');
        	document.body.innerHTML = "<a href='" + this.responseText + "'>Click here if you are not redirected</a>";
   			alert('C');
        	alert("You will be redirected shortly!");
            window.location.href(this.responseText);
    		alert('D');
        }
    };
    alert('3');
    xhttp.open("POST", "https://api.nuscomputing.com/index.php", true);
    alert('4');
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    alert('5');
    xhttp.send("id=" + selected + "&resp=" + response);
    alert('6');
}
function handleEvent(passedInElement) {
    return function(e) {
        e.preventDefault();
        selected = this.lastChild.getAttribute('data-name');
        console.log("Selected: " + selected);
        hideCaptchas();
        grecaptcha.render(this.lastChild, {
            'sitekey': '6LdUQq8UAAAAAL33cKgZOXS5uleGSIP3e41Zoo8N',
            'callback': 'verifyCaptcha'
        });
    };
}
var onloadCallback = function() {
    console.log("grecaptcha is ready!");
    var elements = document.getElementsByClassName('captcha');
    for (var i = 0; i < elements.length; i++) {
        var element = elements[i];
        element.addEventListener('click', handleEvent(elements[i]));
    }
};
