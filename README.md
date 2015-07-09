Foko's PhotoFeed Widget
-------------------------------

This is a widget that displays your comapny's photofeeds on your website.

#####Send questions and suggestions to <a href="mailto:support@foko.co" target="_top">haoluo91@gmail.com.</a>
-------------------------------

**Before you start:** 
<p>
If you do not already have an API Key from Flickr, please use the link below to obtain one:
<a href="https://www.flickr.com/services/api/misc.api_keys.html" target="_top">
Flickr API Key</a></p>

**Supported Browsers**

IE users: The slide show version supports for IE 8, 9, 10, 11, grid view version only supports for IE 10 and above.

Non IE users: The widget fully supports for Chrome, Firefox and Safari, however it is highly recommended to upgrade to the latest version of these browsers in order to achieve optimal experience.

**How to use**

There are two versions of this widget: the **Slide Show** and **Grid View**.

Slide Show:

![readme screenshot 1](https://files.foko.co/Foko%20PhotoFeed%20Wordpress%20Widget/Readme%20Pictures/foko-general-widget-readme-1.png)

The slide show version is an iframe web widget, to use it, simply copy the following code to your html markup and replace the values for data-access-token, data-user-idand adata-photoset-id with your own:

        <iframe id="foko-widget" src="http://haoluo.ca/widgets/flickr-slideshow/flickr_general_widget_slideshow.html?width=320&amp;height=360&amp;data-access-token=54b277fc3641fcc30ffde70d310b4b5a&amp;data-display-method=slide&amp;data-number-photos=&amp;data-user-id=133628422@N05&amp;data-photoset-id=72157653619116089&amp;auto-cycling=false" width="320px" height="360px" frameborder="0" scrolling="no"></iframe>

You can insert this snippet anywhere in your html page but keep in mind that this is an iframe, so you will have to adjust the dimensions of the iframe manually to fit in your parent div.

Configuration parameters:
You can configure the widget by changing the query strings, just enter the input values right after the "=" sign without any spaces.

- width (contained in the query string as part of the src): set the width of the photo in px.

- width (iframe attribute, not part of the src): set the width of the iframe in px.

- height (contained in the query string as part of the src): set the max height of the photo in px.

- height (iframe attribute, not part of the src): set the height of the iframe in px.

- data-access-token: enter your Flickr API Key here.

- data-number-photos: enter a number between 1 to 40, this specifies the number of photos to be displayed by the widget. The default value is 20 if you leave it empty.

- auto-cycling: a boolean value, if set to true the slide show will automatically cycle through the photos.

- data-user-id: your Flickr userid.

- data-photoset-id: the ID of the photoset that you want to show.

-------------------------------

Grid View:

![readme screenshot 2](https://files.foko.co/Foko%20PhotoFeed%20Wordpress%20Widget/Readme%20Pictures/foko-general-widget-readme-2.png)

The gird view version is an embedded web widget, to use it please copy the following javascript code to your html markup where you want the widget to appear:
Note: the javascript will append the widget to the parent div of where it is being placed.

	<script id="flickr-widget" src="http://haoluo.ca/widgets/flickr-gridview/flickr_general_widget_gridview.js" type="text/javascript" data-width="340" data-api-key="54b277fc3641fcc30ffde70d310b4b5a" data-number-photos="25" data-user-id="133628422@N05" data-photoset-id="72157653302226680" data-display-method="grid"></script>

Configuration parameters:

- data-width: set the width of the widget.
	- Note: for the grid view version, it is recommended  to set the width as a multiple of the width of the photo in order to achieve the best visual experience.

- data-access-token: enter your Flickr API Key here.

- data-number-photos: enter a number between 1 to 40, this specifies the number of photos to be displayed by the widget. The default value is 20 if you leave it empty.

- data-user-id: your Flickr userid.

- data-photoset-id: the ID of the photoset that you want to show.

**Responsive Design**

You can make the widget to be responsive with the screen size by adding extra CSS to your main page.

For example:

	@media (max-width: 1200px){
	/*Make the grid view to resize to 1 column if the screen size is smaller than 1200px*/
		#flickr-widget-photo-wrapper{
			width: 156px!important;
		}
	/*Resize the width of the iframe to be 250px when the screen size is smaller than 1200px*/
		#flickr-widget{
			width: 250px;
		}
	}
