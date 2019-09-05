<?php

use PHPUnit\Framework\TestCase;

class SampleTest extends TestCase{
    function testName(){

        $textClass = new \App\SampleUserForTest;
        $this->assertEquals("Hello",$textClass->hello());

    }

    function testBoolean(){
        $this->assertFalse(false,"Checks Boolean");
    }
}
?>