
function fallbackCopyTextToClipboard (text, notifyFn) {
  const textArea = document.createElement('textarea')
  textArea.value = text
  document.body.appendChild(textArea)
  textArea.focus()
  textArea.select()
  try {
    const successful = document.execCommand('copy')
    const msg = successful ? 'successful' : 'unsuccessful'
    console.log('Fallback: Copying text command was ' + msg)
  } catch (err) {
    notifyFn('Fallback: Oops, unable to copy' + err)
    // Notify.create('Fallback: Oops, unable to copy' + err)
  }
  document.body.removeChild(textArea)
}
function copyTextToClipboard2 (text, callback, notifyFn) {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text, notifyFn)
    return
  }
  navigator.clipboard.writeText(text).then(function () {
    callback.ok()
  }, function (err) {
    callbackHelper.callbackWithSimpleError('Copy Failed: ' + err)
  })
}

export default {
  copyTextToClipboard2: copyTextToClipboard2
}
