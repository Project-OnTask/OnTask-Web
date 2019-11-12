import React from 'react'
import PDFlogo from '../assets/img/file-type-icons/png/pdf.png'
import JPGlogo from '../assets/img/file-type-icons/png/jpg.png'
import HTMLlogo from '../assets/img/file-type-icons/png/html.png'
import MP3logo from '../assets/img/file-type-icons/png/mp3.png'
import TXTlogo from '../assets/img/file-type-icons/png/txt.png'
import PNGlogo from '../assets/img/file-type-icons/png/png.png'
import SVGlogo from '../assets/img/file-type-icons/png/svg.png'
import ZIPlogo from '../assets/img/file-type-icons/png/zip.png'

export default function getMatchingFileTypeIcon(extension) {
  switch (extension) {
    case "pdf":
      return <img src={PDFlogo} height="20" width="20" alt=""/>
    case "jpg":
            return <img src={JPGlogo} height="20" width="20"  alt=""/>
    case "html":
            return <img src={HTMLlogo} height="20" width="20" alt=""/>
    case "mp3":
            return <img src={MP3logo} height="20" width="20" alt=""/>
    case "txt":
            return <img src={TXTlogo} height="20" width="20" alt=""/>
    case "png":
            return <img src={PNGlogo} height="20" width="20" alt=""/>
    case "svg":
            return <img src={SVGlogo} height="20" width="20" alt=""/>
    case "rar":
            return <img src={ZIPlogo} height="20" width="20" alt=""/>
    case "zip":
            return <img src={ZIPlogo} height="20" width="20" alt=""/>
    default:
      return <></>;
  }
}
