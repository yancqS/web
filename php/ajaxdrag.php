<?php
  if(is_uploaded_file($_FILES["Dfile"]["tmp_name"])){
    move_uploaded_file($_FILES["Dfile"]["tmp_name"],"./".$_FILES["Dfile"]["name"]);
  }
?>