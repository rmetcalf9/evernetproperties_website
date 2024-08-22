
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

function isThirdPartySigninDisabled () {
  try {
      // Try to set a cookie
      document.cookie = "thirdpartysignincheckcookie=1";
      var cookieEnabled = document.cookie.indexOf("thirdpartysignincheckcookie") !== -1;

      // Try to use localStorage
      localStorage.setItem("thirdpartysignincheckvalue", "1");
      var storageEnabled = localStorage.getItem("thirdpartysignincheckvalue") === "1";

  } catch (error) {
      return true
  }
  return false
}

export default {
  copyTextToClipboard2: copyTextToClipboard2,
  isThirdPartySigninDisabled: isThirdPartySigninDisabled
}
