/*
Copyright (c) 2003-2009, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

CKEDITOR.editorConfig = function( config )
{
//	 config.toolbar=[
//					['Source','-','Save','NewPage','Preview','-','Templates'],
//					['Cut','Copy','Paste','PasteText','PasteFromWord','-','Print','SpellChecker','Scayt'],
//					['Undo','Redo','-','Find','Replace','-','SelectAll','RemoveFormat'],
//					['Form','Checkbox','Radio','TextField','Textarea','Select','Button','ImageButton','HiddenField'],'/',
//					['Bold','Italic','Underline','Strike','-','Subscript','Superscript'],
//					['NumberedList','BulletedList','-','Outdent','Indent','Blockquote'],
//					['JustifyLeft','JustifyCenter','JustifyRight','JustifyBlock'],
//					['Link','Unlink','Anchor'],
//					['Image','Flash','Table','HorizontalRule','Smiley','SpecialChar','PageBreak'],'/',
//					['Styles','Format','Font','FontSize'],
//					['TextColor','BGColor'],
//					['Maximize','ShowBlocks']
//					];
	 config.toolbar=[
					[/*'Font',*/'FontSize','Bold','Underline','Strike','TextColor','-','Subscript','Superscript'],
					/*['Undo','Redo','-','RemoveFormat'],
					['Maximize','ShowBlocks']*/
					];
	 config.font_names = '����/����;����/����;����/����_GB2312;����/����_GB2312;����/����;��Բ/��Բ;'+ config.font_names ;  
	 config.skin = 'office2003';
};
