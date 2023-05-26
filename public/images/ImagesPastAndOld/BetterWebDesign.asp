<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html>
<head>
	<title>Better Web Design</title>
<Link rel="stylesheet" type="text/css" href="/ssw/Include/sswmenu.css">
<link href="/ssw/Include/ssw.css" type="text/css" rel="stylesheet">
		<link href="/ssw/Images/IcoSSW_v2.ico" rel="shortcut icon">
<script language="JavaScript" src="/ssw/Include/incCheckemail.js"></script>
</head>

<body TOPMARGIN="0" LEFTMARGIN="0" MARGINWIDTH="0" MARGINHEIGHT="0" TEXT="#000000" ALINK="#003399" LINK="#003399" VLINK="#003399" >
<bgsound id="sound" loop="1"> 
<TABLE WIDTH=100% BGCOLOR=white BORDER=0 CELLSPACING=0 CELLPADDING=0>
	
<TR>
    <TD><img src='/ssw/Images/SSWsmall.gif' alt="SSW" name="Image1" ><img src="Images/hd_BetterWebDesign.GIF" alt="Better web design" width="370" height="45"><img src='../Images/hd_2.gif' alt="SSW" width="200" height="45" ></TD>
  </TR>
</TABLE>
		<script language="JavaScript" src="/ssw/Include/MenuDropDown.js" type="text/javascript"></script>
<script language="JavaScript" src="/ssw/Include/MenuDropDownData.js" type="text/javascript"></script>
<SCRIPT language=JavaScript type=text/javascript>
		  showToolbar();
		  updateIt();
</SCRIPT>

<!-- end heading//-->
<BR>
<table  bgcolor=white cellpadding=0 cellspacing=0 width=101% border=0>
  <tr><!-- spacer row - specify all others with colspan or rowspan--><!--1-->
    <td width=11></td>
    <!--2-->
    <td width=213></td>
    <!--3-->
    <td width=1></td>
    <!--4-->
    <td width=24></td>
    <!--5-->
    <td width=362></td>
    <!--6-->
    <td width=32></td>
    <!--7-->
    <td width=97></td>
    <!--8-->
    <td width=32></td>
    <!--9-->
    <td width=208></td>
    <!--10-->
    <td width=30></td>
  </tr>
  <tr><!-- spacer column --> 
    <td rowspan=2 valign="top"  colspan=2 >
    <table cellspacing="2" cellpadding="2" summary="Formatting Table" ID="Table1">
		<tr>
			<td>
				<form id="frmSearch" name="frmSearch" onsubmit="return ValidateForm(this);" action="/ssw/frmEmailProcess.asp" method="get">
					<table align="center" cellspacing="0" cellpadding="0" summary="Formatting Table" ID="Table2">
						<tr>
							<td nowrap>
								<span class="clsLeftNavBar">Search Knowledge Base</span>
							</td>
						</tr>
						<tr>
							<td  nowrap>
								<input id="searchFor" name="searchFor" maxlength="60" size="10"> <input type="submit" class="clsInputButton" id="btnSubmit" name="btnSubmit" value="Search">
								<input type="hidden" id="searchON" name="searchON" value="Words">
							</td>
						</tr>
					</table>
				</form>
				<form id="frmSearchIS" name="frmSearchIS" onsubmit="return ValidateForm(this);" action="/ssw/search.aspx" method="post">
					<table align="center" cellspacing="0" cellpadding="0" summary="Formatting Table" ID="Table3">
						<tr>
							<td>
								<span class="clsLeftNavBar">Search SSW Website</span>
							</td>
						</tr>
						<tr>
							<td>
								<input id="query" name="query" maxlength="60" size="10"> <input type="submit" class="clsInputButton" id="btnSubmitIS" name="btnSubmitIS" value="Search">
							</td>
						</tr>
					</table>
				</form>
				<form id="newsletter" name="newsletter" action="/ssw/frmEmailProcess.asp" method="get">
					<table align="center" cellspacing="0" cellpadding="0" summary="Formatting Table" ID="Table4">
						<tr>
							<td>
								<span class="clsLeftNavBar">Free Newsletter</span>
							</td>
						</tr>
						<tr>
							<td  nowrap>
								<input type="text" id="ctlemail" name="ctlemail" maxlength="60" size="10" value="Your Email" onblur="if (value == '') {value = 'Your Email'}" onfocus="if (value == 'Your Email') {value =''}">
								<input type="submit" id="btnSubmit2" class="clsInputButton" value="Sign Up" onclick="return emailOK(document.newsletter.ctlemail.value);" NAME="btnSubmit2">
								<input type="hidden" id="T" name="T" value="FreeNewsletter">
							</td>
						</tr>
					</table>
				</form>
			</td>
		</tr>
</table>
    
    
    </td>
    <!-- spacer column --> 
    <td rowspan=2 bgcolor="#7d7d7d" width="1"></td>
    <!-- spacer column --> 
    <td rowspan=2 width="24"></td>
    <!--main content cell--> 
    <td colspan=5 valign="top"> 
      <p>&nbsp;</p>
      <table width="100%" cellpadding="0">
        <tr bgcolor="#ff0033"> 
          <td>.</td>
        </tr>
      </table>
      <table width="100%" cellpadding="0">
        <tr bgcolor="#cccccc"> 
          <td><b><a name="MediaMonit"></a>Academy 
            Tiles </b></td>
        </tr>
      </table>
      <p>What is your 
        experience of the www? Have you been to sites where you think &quot;well 
        I think your flash movie is probably pretty groovy, but I just don't have 
        the time to download it!&quot; or perhaps you've thought &quot;I know 
        I found this page last time I was on this site, but I can't for the life 
        of me find it again!&quot;</p>
      <p>Each one 
        different, </p>
      <table width="90%" border="2" cellspacing="2" cellpadding="2" bordercolor="#FF0000">
        <tr bordercolor="#CCCCCC" bgcolor="#CCCCCC"> 
          <td width="25%">varchar 
            , nvarchar</td>
          <td width="25%">pstr</td>
          <td width="25%">@pstrEmail</td>
          <td width="25%">varchar(150)</td>
        </tr>
        <tr bordercolor="#CCCCCC" bgcolor="#CCCCCC"> 
          <td width="25%">int</td>
          <td width="25%">pint</td>
          <td width="25%">@pintContactID</td>
          <td width="25%">int</td>
        </tr>
        <tr bordercolor="#CCCCCC" bgcolor="#CCCCCC"> 
          <td width="25%">bit</td>
          <td width="25%">pbit</td>
          <td width="25%">@bitPrimaryContact</td>
          <td width="25%">bit</td>
        </tr>
      </table>
      <p>always write code in 
        this font...</p>
      
      <!--#include virtual="/ssw/Include/FooterSSW.htm" --> 
    <td rowspan=2 width="30"></td>
  </tr>
  <tr> </tr>
</table>
</body></HTML>
