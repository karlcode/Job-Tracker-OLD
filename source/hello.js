/**extracts from meta tags:
  - title
  - description
*/
function extractMeta(jobDetails) {
  var tag = '';
  var metaName ='';
  var metaContent = '';
  var metaTags = document.getElementsByTagName('meta');
  for (var i = 0; i < metaTags.length; i++) {
    if (metaTags[i].getAttribute('name')) {
      metaName = metaTags[i].getAttribute('name');
    } else if (metaTags[i].getAttribute('property')) {
      metaName = (metaTags[i].getAttribute('property'));
    } else {
      continue;
    }

    //og meta tags are more likely to be accurate
    metaContent = metaTags[i].getAttribute('content');
    switch (metaName) {
      case 'og:title':
        jobDetails.title = metaContent;
        break;
      case 'title':
        if (!jobDetails.title)
          jobDetails.title = metaContent;
        break;
      case 'og:description':
        jobDetails.description = metaContent;
        break;
      case 'description':
        if (!jobDetails.description)
          jobDetails.description = metaContent;
        break;
      case 'url':
        jobDetails.url = metaContent;
        break;
    }
  }  
}

/**extracts from URL:
  - URL
  - company (set to first word in url)
*/
function extractURL(jobDetails) {
  var url = window.location.href;

  if (!jobDetails.url)
    jobDetails.url = url;


  url = url.replace(/.*\/\//, '');
  url = url.replace(/^www./, '');
  url = url.replace(/^jobs?\.?/, '');
  var company = url.substr(0, url.indexOf('.'));

  if (company)
    jobDetails.company = company;
}

function findTitle(jobDetails) {
  var h1 = document.getElementsByTagName('h1')
  if (h1[0].innerHTML && h1[0].innerHTML != '')
    jobDetails.title = h1[0].innerHTML;
}

(function getJobDetails(){
  var jobDetails = {};

  extractMeta(jobDetails);
  extractURL(jobDetails);

  if (!jobDetails.title) {
    findTitle(jobDetails);
  }

  console.log(jobDetails);
})();
>>>>>>> 0115ad532533340d2f0965f8f219bde63d3092b0
