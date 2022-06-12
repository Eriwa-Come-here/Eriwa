// 프로필 클릭 메뉴 보여주기
function showDrop(id) {
    const profile = document.getElementById(id);
    //profile.classList.toggle("drop-list-show");
    profile.classList.add("drop-list-show");

}

// 프로필 클릭 메뉴 닫기
function hideDrop(id) {
    const profile = document.getElementById(id);
    //profile.classList.toggle("drop-list-show");
    setTimeout(() => {
        profile.classList.remove("drop-list-show");
    }, 100);
}

// 현재 문서의 url 복사하기
function copyUrl() {
    var url = '';
    var textarea = document.createElement("textarea");
    document.body.appendChild(textarea);
    url = window.document.location.href;
    textarea.value = url;
    textarea.select();
    document.execCommand("copy");
    document.body.removeChild(textarea);
    alert("url을 복사했습니다. 원하는 곳에 붙여넣기(Ctrl+V) 해주세요.")
}
  
// 댓글 수정창 보여주기
function showEdit(content_id, edit_id) {
    const content = document.getElementById(content_id);
    const edit = document.getElementById(edit_id);
    content.classList.add('comment-edit-hide');
    edit.classList.add('comment-edit-show');
}
  
// 댓글 수정창 숨기기
function hideEdit(content_id, edit_id, textarea_id) {
    const content = document.getElementById(content_id);
    const edit = document.getElementById(edit_id);
    if (confirm("댓글 수정을 취소하시겠습니까?")) {
        content.classList.remove('comment-edit-hide');
        edit.classList.remove('comment-edit-show');
        document.getElementById(textarea_id).value = "";
    } else {
        return;
    }
}

// 쪽지 작성창 열기
function openNote(modal_id, user_nickname) {
    document.getElementById(modal_id).classList.remove('hide-note');
    const modal = document.getElementById("recipient-in-post");
    modal.value = user_nickname;
  }

// 쪽지 작성창 닫기
function closeNote(modal_id, textarea_id) {
    if (confirm("쪽지 작성을 취소하시겠습니까?")) {
        document.getElementById(modal_id).classList.add('hide-note');
        document.getElementById(textarea_id).value = "";
    } else {
    return;
    }
}