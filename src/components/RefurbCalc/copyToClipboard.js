

// from https://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript
function fallbackCopyTextToClipboard (text) {
  var textArea = document.createElement('textarea')
  textArea.value = text
  document.body.appendChild(textArea)
  textArea.focus()
  textArea.select()
  try {
    var successful = document.execCommand('copy')
    var msg = successful ? 'successful' : 'unsuccessful'
    console.log('Fallback: Copying text command was ' + msg)
  } catch (err) {
    Notify.create('Fallback: Oops, unable to copy' + err)
  }
  document.body.removeChild(textArea)
}
function copyTextToClipboard (text, callback) {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text)
    return
  }
  navigator.clipboard.writeText(text).then(function () {
    callback.ok()
  }, function (err) {
    callback.error('Copy Failed: ' + err)
  })
}

export default {
  copyTextToClipboard: copyTextToClipboard
}
