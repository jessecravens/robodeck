Ext.define('Device.controller.Camera', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            camera: 'camera',
            imageList: 'imageList',
            imageView: 'imageView'
        },

        control: {
            'button[text=Capture]': {
                tap: 'onCapture'
            },
            'button[text=Select]': {
                tap: 'onSelect'
            },
            'imageList image': {
                tap: 'onItemTap'
            },
            'imageView button[ui=back]': {
                tap: 'onBackButtonTap'
            }
        }
    },

    launch: function() {
        this.getImageList().setStore(Ext.getStore('Images'));
    },

    /**
     * Tells the device to take a picture, using the Camera.capture device API.
     */
    onCapture: function() {
        Ext.device.Camera.capture({
            success: this.onCaptureSuccess,
            scope: this,
            source: 'camera',
            destination: 'file'
        });
    },

    /**
     * Tells the device to select a picture, using the Camera.capture device API.
     */
    onSelect: function() {
        Ext.device.Camera.capture({
            success: this.onCaptureSuccess,
            scope: this,
            source: 'library',
            destination: 'file'
        });
    },

    /**
     * The device API returns a URI for the image, so lets add that into the image list store
     */
    onCaptureSuccess: function(uri) {
        Ext.getStore('Images').add({src: uri});
    },

    /**
     * When a user taps on an image, show the imageView view, and update the view to show the new image
     */
    onItemTap: function(item) {
        this.getImageView().down('image').setSrc(item.getSrc());
        this.getCamera().setActiveItem(this.getImageView());
    },

    /**
     * When the user taps on the back button in the image view, do back to the images list
     */
    onBackButtonTap: function() {
        this.getCamera().setActiveItem(0);
    }
});
