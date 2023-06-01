<%@ Page Language="c#" AutoEventWireup="false" MasterPageFile="~/Masters/SubPage.master"
    Title="SSW Logo" %>

<%@ Register TagPrefix="text" TagName="Location" Src="/ssw/components/location.ascx" %>
<%@ Register Assembly="AjaxControlToolkit" Namespace="AjaxControlToolkit" TagPrefix="ajaxToolkit" %>
<asp:Content ID="Content1" ContentPlaceHolderID="titleUX" runat="server">


<script runat="server">
  protected override void OnLoad(EventArgs e)
  {      
      Response.StatusCode = 301;
      Response.AddHeader("Location", "/SSW/Logo");
  }
</script>


</asp:Content>