function positionAccessibilityMenu() {
  var widget = document.querySelector('.accessibility-widget');
  var accessibilityOptions = document.getElementById('accessibilityOptions');

  if (widget && accessibilityOptions) {
      var widgetRect = widget.getBoundingClientRect();
      var topPosition = widgetRect.bottom + window.scrollY;
      var leftPosition = widgetRect.left;

      accessibilityOptions.style.position = 'absolute';
      accessibilityOptions.style.top = topPosition + 'px';
      accessibilityOptions.style.left = leftPosition + 'px';
  }
}

function toggleAccessibilityOptions() {
  var accessibilityOptions = document.getElementById('accessibilityOptions');
  if (accessibilityOptions.style.display === 'block') {
      accessibilityOptions.style.display = 'none';
  } else {
      accessibilityOptions.style.display = 'block';
      positionAccessibilityMenu(); // Position it every time it's shown
  }
}

// Update position on scroll and resize
window.addEventListener('scroll', positionAccessibilityMenu);
window.addEventListener('resize', positionAccessibilityMenu);


window.addEventListener('resize', function() {
  var accessibilityOptions = document.getElementById('accessibilityOptions');
  if (accessibilityOptions.style.display === 'block') {
      var widget = document.querySelector('.accessibility-widget');
      var widgetRect = widget.getBoundingClientRect();
      accessibilityOptions.style.top = (widgetRect.bottom + window.scrollY) + 'px';
      accessibilityOptions.style.left = widgetRect.left + 'px';
  }
});


  // Function to handle high contrast option----------------------------------------------------------
  function toggleHighContrast() {
    var body = document.getElementsByTagName('body')[0];
    var highContrastCheckbox = document.getElementById('highContrastCheckbox');
    //get your images here for ex: document.getElementById
    if (highContrastCheckbox.checked) {
        body.style.backgroundColor = '#000';
        body.style.color = '#fff';
      
        //Cycle throw all images
        updateIcons('./assets/updatedPhotoWhite.png');
        
        // Get all elements
        var elements = document.querySelectorAll('body *:not(a *)');
        for (var i = 0; i < elements.length; i++) {
            elements[i].style.backgroundColor = '#000';
            elements[i].style.color = '#fff';
        }
    } else {
        body.style.backgroundColor = '#fff';
        body.style.color = '#000';
        

      //Cycle throw all images
          updateIcons('./assets/updatedPhotoBlack.png');
        
        // Get all elements
        var elements = document.querySelectorAll('body *:not(a *)');
        for (var i = 0; i < elements.length; i++) {
            elements[i].style.backgroundColor = '#fff';
            elements[i].style.color = '#000';
        }
    }
}

function updateIcons(newIconPath) {
  var icons = document.querySelectorAll('.checkmark'); // Select all images with class 'checkmark' for example
  icons.forEach(function(icon) {
      icon.src = newIconPath; // Update the source of each icon
  });
}


  // Function to handle larger text option------------------------------------------------------------
function toggleLargerText() {
    var largerTextCheckbox = document.getElementById('largerTextCheckbox');
    var allTextNodes = getTextNodes(document.body);
    
    for (var i = 0; i < allTextNodes.length; i++) {
        var textNode = allTextNodes[i];
        var parentElement = textNode.parentElement;

        if (textNode.textContent.trim() === '') {
            continue;
        }
        
        var currentFontSize = parseFloat(window.getComputedStyle(parentElement, null).getPropertyValue('font-size'));
        var newFontSize = largerTextCheckbox.checked ? (currentFontSize + 5) : (currentFontSize - 5);
        parentElement.style.fontSize = newFontSize + 'px';
    }
}

function getTextNodes(element) {
    var textNodes = [];
    
    function getTextNodesRecursively(node) {
        node.childNodes.forEach(function(childNode) {
            if (childNode.nodeType === Node.TEXT_NODE) {
                textNodes.push(childNode);
            } else if (childNode.nodeType === Node.ELEMENT_NODE) {
                getTextNodesRecursively(childNode);
            }
        });
    }
    
    getTextNodesRecursively(element);
    return textNodes;
}


  // Function to handle magnifying glass option-----------------------------------------------------
function toggleMagnifyingGlass() {
  var magnifyingGlassCheckbox = document.getElementById('magnifyingGlassCheckbox');

  if (magnifyingGlassCheckbox.checked) {
      // Add class to body
      document.body.classList.add('magnify');
      // Add event listener to track mouse click for magnifying glass effect
      document.addEventListener('mousedown', handleMouseDown);
  } else {
      // Remove class from body
      document.body.classList.remove('magnify');
      // Remove event listener if the checkbox is unchecked
      document.removeEventListener('mousedown', handleMouseDown);
      // Restore content to its original size
      // The scale is reset via CSS when the 'magnify' class is removed
      var body = document.body;
      // Reset the transform to none
      body.style.transform = 'none';
      // Reset the state of magnification
      isMagnified = false;
  }
}

let isMagnified = false;  // Tracks the state of magnification

function handleMouseDown(event) {
    // Prevent triggering magnification in certain areas
    if (event.target.closest('.accessibility-options') || event.target.closest('.accessibility-widget')) {
        return;
    }

    // Check for left mouse button click
    if (event.button === 0) {
        const body = document.body;
        
        if (!isMagnified) {
            // Calculate the click position as a percentage of the viewport dimensions
            var originX = (event.clientX / window.innerWidth) * 100;
            var originY = (event.clientY / window.innerHeight) * 100;

            // Set the transform origin to the click position
            body.style.transformOrigin = `${originX}% ${originY}%`;

            // Apply scale transformation
            body.style.transform = 'scale(1.5)';
            isMagnified = true;
        } else {
            // Reset the transform to none
            body.style.transform = 'none';
            isMagnified = false;
        }
    }
}


// Function to handle keyboard navigation option--------------------------------------------------------------------
function toggleKeyboardNavigation() {
  var keyboardNavigationCheckbox = document.getElementById('keyboardNavigationCheckbox');

  if (keyboardNavigationCheckbox.checked) {
    document.body.focus();

    alert("Keyboard navigation assistance enabled. You can navigate through interactive elements using the Tab key.");

    var headers = document.querySelectorAll('h1, h2, h3, h4, h5, h6');

    // Add tabindex="0" to all headers except those inside <a> elements
    headers.forEach(function(header) {
      if (!header.closest('a')) { // Check if the header is not inside an <a> element
        header.setAttribute('tabindex', '0');
      }
    });
  } else {
    alert("Keyboard navigation assistance disabled.");

    var headers = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    headers.forEach(function(header) {
      header.removeAttribute('tabindex');
    });
  }
}



// Function to handle image description option-------------------------------------------------------------------
function toggleImageDescription() {
  var imageDescriptionCheckbox = document.getElementById('imageDescriptionCheckbox');
  var images = document.querySelectorAll('img');

  if (imageDescriptionCheckbox.checked) {
    // Add event listeners to show descriptions on hover
    images.forEach(function(image) {
      var description = image.alt || "No description available";
      image.addEventListener('mouseenter', function() {
        showImageDescription(image, description);
      });
      image.addEventListener('mouseleave', hideImageDescription);
    });
  } else {
    // Remove event listeners and hide descriptions if the checkbox is unchecked
    images.forEach(function(image) {
      image.removeEventListener('mouseenter', showImageDescription);
      image.removeEventListener('mouseleave', hideImageDescription);
      hideImageDescription(); // Also hide any existing description boxes
    });
  }
}

// Function to show image description
function showImageDescription(image, description) {
  if (!document.getElementById('imageDescriptionCheckbox').checked) {
    return; // Don't show description if the checkbox is not checked
  }

  var descriptionBox = document.createElement('div');
  descriptionBox.classList.add('image-description');
  descriptionBox.textContent = description;
  descriptionBox.style.position = 'absolute';
  descriptionBox.style.backgroundColor = '#000';
  descriptionBox.style.color = '#fff';
  descriptionBox.style.padding = '5px';
  descriptionBox.style.borderRadius = '5px';
  descriptionBox.style.zIndex = '9999';
  //descriptionBox.style.top = image.offsetTop + image.height + 'px';
  //descriptionBox.style.left = image.offsetLeft + 'px';

  // Calculate the top and left positions to align the box just below the image
  var rect = image.getBoundingClientRect(); // Get the bounding rectangle of the image
  descriptionBox.style.top = (rect.bottom + window.scrollY) + 'px'; // Position below the image including scroll adjustments
  descriptionBox.style.left = rect.left + 'px'; // Align with the left side of the image

  document.body.appendChild(descriptionBox);
}

// Function to hide image description
function hideImageDescription() {
  var descriptionBoxes = document.querySelectorAll('.image-description');
  descriptionBoxes.forEach(function(box) {
    box.remove();
  });
}



document.getElementById('highContrastCheckbox').addEventListener('change', toggleHighContrast);
document.getElementById('largerTextCheckbox').addEventListener('change', toggleLargerText);
document.getElementById('keyboardNavigationCheckbox').addEventListener('change', toggleKeyboardNavigation);
document.getElementById('imageDescriptionCheckbox').addEventListener('change', toggleImageDescription);
document.getElementById('magnifyingGlassCheckbox').addEventListener('change', toggleMagnifyingGlass);
