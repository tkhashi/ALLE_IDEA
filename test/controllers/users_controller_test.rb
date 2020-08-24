require 'test_helper'

class UsersControllerTest < ActionDispatch::IntegrationTest
  test "should get show" do
    get users_show_url
    assert_response :success
  end

  test "should get edit" do
    get users_edit_url
    assert_response :success
  end

  test "should get following" do
    get users_following_url
    assert_response :success
  end

  test "should get follower" do
    get users_follower_url
    assert_response :success
  end

  test "should get last_confirm" do
    get users_last_confirm_url
    assert_response :success
  end

  test "should get please_signin" do
    get users_please_signin_url
    assert_response :success
  end

  test "should get thanks" do
    get users_thanks_url
    assert_response :success
  end

end
