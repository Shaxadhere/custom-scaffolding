//
//(Begin) Html Holder Variables
//

//Create
var Create_Faculty, Create_FacultyDesignation, Create_FacultyAccessRole, Create_FacultyTiming, Create_Lab, Create_LabType, Create_Batch, Create_LabEquipment, Create_LabEquipmentType, Create_CertificateProgram, Create_Centre, Create_Room, Create_RoomType, Create_Class;
//Edit
var Edit_Faculty, Edit_FacultyDesignation, Edit_FacultyAccessRole, Edit_FacultyTiming, Edit_Lab, Edit_LabType, Edit_Batch, Edit_LabEquipment, Edit_LabEquipmentType, Edit_CertificateProgram, Edit_Centre, Edit_Room, Edit_RoomType;
//Detail
var Detail_Faculty, Detail_FacultyDesignation, Detail_FacultyAccessRole, Detail_FacultyTiming, Detail_Lab, Detail_LabType, Detail_Batch, Detail_LabEquipment, Detail_LabEquipmentType, Detail_CertificateProgram, Detail_Class, Detail_Centre, Detail_Room, Detail_RoomType;
//JsonData : Faculty
var Json_FacultyDesignation, Json_FacultyAccessRole, Json_FacultyTiming, Json_FacultyType;
//JsonData : Lab
var Json_LabType, Json_OperatingSystem;
//JsonData : Batch
var Json_Semester, Json_Faculty, Json_CertificateProgram, Json_Batch,Json_BatchStatus;
//JsonData : LabEquipment
var Json_LabEquipmentType;
//JsonData : Class
var Json_Class, Json_Attendance;
//JsonData : Room
var Json_RoomType;
//JsonData : Centre
var Json_Centre;
//JsonData : User
var Json_User;
//JsonData : LabStatus
var LabStatus_Settings;
//
//(End) Html Holder Variables
//

function GetById(data, id) {
    var name;
    $.each(data, function (i) {
        if (data[i].PK_Id == id) {
            name = data[i];
        }
    });
    return name;
}

function SearchByColumn(dataSource, value, column) {
    var name = null;
    $.each(dataSource, function (i) {
        if (dataSource[i][column] == value) {
            name = dataSource[i];
        }
    });
    return name;
}


function GetJsonById(url) {
    var jdata;
    $.ajax({
        type: 'GET',
        async: false,
        url: url,
        success: function (data) {
            jdata = data;
        },
        error: function (err) {
            console.error(err);
        }
    });
    return jdata;
}



(function () {
    $('.bs-component [data-toggle="popover"]').popover();
    $('.bs-component [data-toggle="tooltip"]').tooltip();
})();
var showInAlert = function (data) {
    var json = JSON.parse(data);
    //$("#my-notify").append(json.Output)
    FilterTable();
}



function CloseModal() {
    $("#createmodal").modal('hide');
}
var getResult = function (data) {

    var json = JSON.parse(data);
    if (json.Status == "danger") {
        $("#create-modal-errors").html(json.Output)
    }
    else {
        clearCreateForm();
        FilterTable();
    }
}
function clearCreateForm() {
    $(".modal").modal('hide');
    $("#createForm").html("");
    $(".modal-backdrop").remove();
}
function clearEditForm() {
    $("#editmodal").modal('hide');
    $("#editForm").html("");
    $(".modal-backdrop").remove();
}
var getEditResult = function (data) {

    var json = JSON.parse(data);
    if (json.Status == "danger") {
        $("#edit-modal-errors").html(json.Output)
    }
    else {
        clearEditForm()
        FilterTable();
    }
}

function Search(e) {
    if ($("#SearchText").val() == null || $("#SearchText").val() == "") {
        FilterTable();
    }
    if (e.KeyCode == 13 || e.which == 13) {
        FilterTable();
        return false;
    }
    return true
}

var SearchText, IsList = true, IsTrash = false, StatusFilter = "all"

function Trash() {
    IsTrash = $('#IsTrash').is(":checked") ? false : true;
}

function FilterTable() {
    $("#ajaxloading").show();
    var filter = {
        SearchText: ($("#SearchText").val() == null) ? "" : $("#SearchText").val(),
        IsList: IsList,
        IsTrash: IsTrash,
        StatusFilter: StatusFilter
    }

    $.ajax({
        url: "/ManagingDirector/Employee/Filter",
        async: true,
        data: filter,
        type: "post",
        success: function (data) {
            $("#filter").html(data);
            $("#ajaxloading").hide();
        },
        error: function (err) {
            console.error(err);
            $("#ajaxloading").hide();
        },
        complete: function () {
            $("#ajaxloading").hide();
        }
    });

}


function RunAjax(url, id) {
    $("#ajaxloading").show();
    $.ajax({
        type: 'GET',
        async: true,
        url: url,
        success: function (data) {
            $(id).html(data);
        },
        complete: function () {
            $("#ajaxloading").hide();
        },
        error: function (err) {
            $("#ajaxloading").hide();
            console.error(err);
        }

    });
}

function HttpAjax(url, method, script) {
    $("#ajaxloading").show();
    $.ajax({
        type: method,
        async: true,
        url: url,
        success: function (data) {
            if (data.success) {
                ShowNotification(data.title, data.message, 'success');
                $('#runScript').html(script);
            }
            else {
                ShowNotification(data.title, data.message, 'danger');
            }
        },
        complete: function () {
            $("#ajaxloading").hide();
        },
        error: function (err) {
            console.error(err);
        }

    });
}

function ShowNotification(title, message, type) {
    var alertHtml = '<div class="bs-component shadow">'
        + '<div class="alert alert-dismissible alert-' + type + '">'
        + '<button type="button" class="close" data-dismiss="alert">&times;</button>'
        + '<strong>' + title + ' </strong><br>' + message
        + '</div>'
        + '</div >';
    $('#my-notify').append(alertHtml);
}



function ConfirmDialog(title, message, type, url, method, modl, script) {
    var dialogHtml = ' <div class="modal fade" id="modal">'
        + '<div class="modal-dialog modal-dialog-centered" role="document">'
        + '<div class="modal-content">'
        + '<div class="modal-header">'
        + '<h5 class="modal-title">' + title + '</h5>'
        + '<button type="button" class="close" data-dismiss="modal" aria-label="Close">'
        + '<span aria-hidden="true">&times;</span>'
        + '</button>'
        + '</div>'
        + '<div class="modal-body">'
        + '<p>' + message + '</p>'
        + '</div>'
        + '<div class="modal-footer">'
        + '<a class="btn btn-' + type + ' text-light" data-dismiss="modal" id="btn-delete-' + modl + '-yes">Yes</a>'
        + '</a>'
        + '<button type="button" class="btn btn-secondary" data-dismiss="modal">No</button>'
        + '</div>'
        + '</div>'
        + '</div>'
        + '</div>';
    $('#modalForm').html(dialogHtml);
    $("#modal").modal('show');
    $('#btn-delete-' + modl + '-yes').click(function () {
        HttpAjax(url, method, script);
    });
}

//setTimeout(RefreshClient, 2000);
//function RefreshClient() {
//    RefreshNotifications();
//    setTimeout(RefreshClient, 2000);
//}
//function RefreshNotifications() {
//    $.ajax({
//        type: 'GET',
//        async: true,
//        url: "/Common/Notification/List",
//        success: function (data) {
//            $("#my-notify").html(data);
//        }
//    });21     
//}

var IsShowing = false;
var isChat = true;
function Nav() {
    if (IsShowing) {
        document.getElementById("mySidenav").style.width = "50px";
        //document.getElementById("main").style.marginLeft = "50px";
        IsShowing = false;
    }
    else {
        document.getElementById("mySidenav").style.width = "250px";
        //document.getElementById("main").style.marginLeft = "250px";
        IsShowing = true;
    }
}
function Chat() {
    if (isChat) {
        document.getElementById("chatarea").style.height = "350px";
        isChat = false;
    }
    else {
        document.getElementById("chatarea").style.height = "0px";
        isChat = true;
    }
}

