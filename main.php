<?php

class ToolsAppJsPackage extends ToolsAppPackage {

	public $packages = array('Tools.Jquery');

	public $files = array(
		'core/core.js' => array(
			'version' => '0.1'
		),
		'core/config.js' => array(
			'version' => '0.1'
		),
		array(
			'callback' => 'appConfig',
			'mime' => 'text/javascript'
		)
	);


	public $subpackages = array(
		'debug' => array(
			'packages' => array(
				'Setup.Debugconsole'
			),
			'files' => array(
				'core/debug/debug.js' => array(
					'version' => '0.1'
				),
				'core/debug/debug.css' => array(
					'version' => '0.1'
				)
			)
		),
		'hash' => array(
			'packages' => array(
				'Tools.Jquery::livequery'
			),
			'files' => array(
				'plugins/hash.js' => array(
					'version' => '0.1'
				)
			)
		),
		'sound' => array(
			'packages' => array(
				'Tools.Soundmanager2'
			),
			'files' => array(
				'plugins/sound.js' => array(
					'version' => '0.1'
				)
			)
		)

	);

	public function appConfig() {
		//$data = '';
		//return array('data' => $data);
		return false;
	}

}