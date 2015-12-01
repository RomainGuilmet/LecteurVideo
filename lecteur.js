//On a besoin de connaître le nombre d'images par secondes de la vidéo
var imgPerSec = 25;

//Et la durée de la vidéo en secondes
var videoDuration = 7.2;

//On récupére l'emplacement des images et le nom par défaut de la série (ici test)
var imgSrc = "./images/test";
//Ainsi que le format des images
var imgType = ".jpg"
//On va remplir un tableau d'images de taille 1 + la durée de la vidéo multipliée par le nombre d'images par secondes avec les images de la vidéo
var imgArray = new Array();
for(var i=0; i<imgPerSec*videoDuration+1; i++)
{
	imgArray[i] = new Image();
	if(i<10)
		imgArray[i].src = imgSrc+"000"+i+imgType;
	else if(i<100)
		imgArray[i].src = imgSrc+"00"+i+imgType;
	else if(i<1000)
		imgArray[i].src = imgSrc+"0"+i+imgType;
	else
		imgArray[i].src = imgSrc+i+imgType;
}

//On récupère la piste audio (qui sera utilisée plus tard)
var audioSrc = "./audio/test.mp3";

//On récupère les différents éléments d'affichaages (la progressBar et le canvas de vidéo)
var progressBar = document.getElementById('progressBar');
var canvas = document.getElementById('video');

//On initialise le contexte pour pouvoir dessiner les images dans le canvas
var context = canvas.getContext('2d');

//On initiliase un compteur à 0 qui servira à nous positionner dans le tableau d'images
var cpt = 0;
//Et un booléen à faux pour dire que la vidéo n'est pas en train d'être jouée
var isPlaying = false;

//On appelle la fonction next afin de préparer le canvas avec la première image
setTimeout(next, 1000/imgPerSec);

/*
Cette fonction permet d'afficher l'image suivante de la vidéo.
Elle sera rappelle elle même avec un délai de 1s sur le nombre d'image par seconde si le booléen isPlaying est à vrai (et donc si la vidéo est lancée) 
	et si on est pas arrivé à la fin du tableau d'images (et donc de la vidéo)
Quand on arrive à la dernière image (et donc à la fin de la vidéo), on met le booléen isPlaying à faux et on redémarre le compteur à 0 pour pouvoir relancer la vidéo du début
*/
function next()
{
	context.drawImage(imgArray[cpt], 0, 0);
	progressBar.value = (cpt*100)/(imgPerSec*videoDuration);
	cpt++;
	if(cpt< imgArray.length && isPlaying)
		setTimeout(next, 1000/imgPerSec);
	if(cpt >= imgArray.length)
	{
		cpt = 0;
		isPlaying = false;
	}
}

/*
Cette fonction est appelée au clic sur le canvas de vidéo ou sur le bouton play.
Elle change l'état du booléen isPlaying et lance donc la vidéo ou la met en pause (en fonction de l'état précédent).
Si elle lance la vidéo, elle appelle alors la fonction next()
*/
function play()
{
	isPlaying = !isPlaying;
	if(isPlaying)
		next();
}