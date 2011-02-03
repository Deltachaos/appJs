<?php

class ToolsAppJsPackage extends ToolsAppPackage {

	public $packages = array('Tools.Jquery', 'Tools.Json');

	public $files = array(
		'core/core.js' => array(
			'version' => '0.1'
		),
		array(
			'callback' => 'config',
			'mime' => 'text/javascript'
		),
		'core/config.js' => array(
			'version' => '0.1'
		)
	);


	public $subpackages = array(
		'debug' => array(
			'packages' => array(
				'Tools.Php::htmlspecialchars',
				'Tools.Jquery::cookie',
				'Tools.Jquery::uiResizable'
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

	public function config() {
		$obj = array(
			'debug' => Configure::read('debug'),
			'baseurl' => Router::url('/'),
			'language' => array(
				'iso2' => 'de', //TODO: Insert right language
				'iso3' => 'deu'
			)
		);
		$js = 'App.config = '.json_encode($obj).";";
		return array('data' => $js);
	}

}