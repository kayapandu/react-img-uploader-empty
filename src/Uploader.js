import React from 'react';
import { upload, download } from './service';

/*
    1. Gunakan tombol #chooseImgButton untuk memilih file gambar untuk diupload
    2. Tampilkan gambar sebagai background elemen #preview
    3. Gunakan service.upload() untuk upload gambar dalam bentuk file JSON. 
       Server akan memberi respon dalam bentuk JSON juga. Di dalamnya ada info tentang ID JSON yang diupload.        
    4. Gunakan service.download() untuk mendownload JSON dari URL di atas. 
       Silakan baca dokumentasi di https://jsonbin.io/api-reference/bins/read.
    5. Tampilkan file base64 yang ada di dalam file JSON di atas sebagai background elemen #uploaded-image

    Contoh hasil akhir: https://www.dropbox.com/s/gypiplh5utq62re/img-uploader.mp4?dl=0
    
    Catatan: Anda hanya perlu mengedit file ini saja.
  */

export default class Uploader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imagePreview: '',
      imageUploaded: '',
      status: ''
    };
  }

  _uploadFunction = e => {
    const fileUpload = URL.createObjectURL(e.target.files[0]);

    this.setState(
      {
        imagePreview: fileUpload,
        status: 'loading...'
      },
      () => {
        upload(fileUpload)
          .then(response => {
            this._downloadFunction(response.data.id);
          })
          .catch(err => {
            this.setState({
              status: 'failed'
            });
          });
      }
    );
  };

  _downloadFunction = id => {
    download(id)
      .then(response => {
        this.setState({
          imageUploaded: response.data.img,
          status: 'success'
        });
      })
      .catch(err => {
        this.setState({
          status: 'failed'
        });
      });
  };

  render() {
    return (
      <div className="uploader">
        <div id="preview">
          <img style={{ height: '100%' }} src={this.state.imagePreview} />
        </div>
        <input
          id="chooseImgButton"
          onChange={this._uploadFunction}
          type="file"
        />
        <div className="post-view">
          <h4>Uploaded</h4>
          <h5>{this.state.status}</h5>
          <div id="uploaded-image">
            <img style={{ height: '100%' }} src={this.state.imageUploaded} />
          </div>
        </div>
      </div>
    );
  }
}
