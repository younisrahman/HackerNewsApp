package com.mainframetask;

import com.facebook.react.ReactActivity;
import android.os.Bundle; // Add for react navigatino

public class MainActivity extends ReactActivity {

  /**
   * Returns the name of the main component registered from JavaScript. This is used to schedule
   * rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "MainframeTask";
  }

  // Add for react navigation
  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(null);
  }
}
